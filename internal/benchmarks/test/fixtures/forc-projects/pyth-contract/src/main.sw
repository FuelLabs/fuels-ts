contract;

use std::{
    asset_id::AssetId,
    block::timestamp,
    bytes::Bytes,
    call_frames::msg_asset_id,
    constants::{
        ZERO_B256,
    },
    context::msg_amount,
    hash::{
        Hash,
        keccak256,
        sha256,
    },
    revert::revert,
    storage::{
        storage_map::StorageMap,
        storage_vec::*,
    },
};

use pyth_interface::{
    data_structures::{
        batch_attestation_update::*,
        data_source::*,
        governance_instruction::*,
        governance_payload::*,
        price::*,
        update_type::UpdateType,
        wormhole_light::*,
    },
    errors::{
        PythError,
        WormholeError,
    },
    events::{
        ConstructedEvent,
        ContractUpgradedEvent,
        DataSourcesSetEvent,
        FeeSetEvent,
        GovernanceDataSourceSetEvent,
        NewGuardianSetEvent,
        UpdatedPriceFeedsEvent,
        ValidPeriodSetEvent,
    },
    pyth_merkle_proof::validate_proof,
    PythCore,
    PythInfo,
    PythInit,
    utils::total_fee,
    WormholeGuardians,
};

use sway_libs::ownership::*;
use standards::src5::{SRC5, State};

const GUARDIAN_SET_EXPIRATION_TIME_SECONDS: u64 = 86400; // 24 hours in seconds
configurable {
    DEPLOYER: Identity = Identity::Address(Address::from(ZERO_B256)),
}

storage {
    //   |                |
    // --+-- PYTH STATE --+--
    //   |                |
    // (chainId, emitterAddress) => isValid; takes advantage of
    // constant-time mapping lookup for VM verification
    is_valid_data_source: StorageMap<DataSource, bool> = StorageMap {},
    // Mapping of cached price information
    // priceId => PriceInfo
    latest_price_feed: StorageMap<PriceFeedId, PriceFeed> = StorageMap {},
    // Fee required for each update
    single_update_fee: u64 = 0,
    // For tracking all active emitter/chain ID pairs
    valid_data_sources: StorageVec<DataSource> = StorageVec {},
    /// Maximum acceptable time period before price is considered to be stale.
    /// This includes attestation delay, block time, and potential clock drift
    /// between the source/target chains.
    valid_time_period_seconds: u64 = 0,
    /// Governance data source. VAA messages from this source can change this contract
    /// state. e.g., upgrade the contract, change the valid data sources, and more.
    governance_data_source: DataSource = DataSource {
        chain_id: 0u16,
        emitter_address: ZERO_B256,
    },
    /// Index of the governance data source, increased each time the governance data source changes.
    governance_data_source_index: u32 = 0,
    /// Sequence number of the last executed governance message. Any governance message
    /// with a lower or equal sequence number will be discarded. This prevents double-execution,
    /// and also makes sure that messages are executed in the right order.
    last_executed_governance_sequence: u64 = 0,
    /// Chain ID of the contract
    chain_id: u16 = 0,
    ///   |                    |
    /// --+-- WORMHOLE STATE --+--
    ///   |                    |
    /// Mapping of consumed governance actions
    wormhole_consumed_governance_actions: StorageMap<b256, bool> = StorageMap {},
    /// Mapping of guardian_set_index => guardian set
    wormhole_guardian_sets: StorageMap<u32, StorageGuardianSet> = StorageMap {},
    /// Current active guardian set index
    wormhole_guardian_set_index: u32 = 0,
    /// Using Ethereum's Wormhole governance
    wormhole_governance_data_source: DataSource = DataSource {
        chain_id: 0u16,
        emitter_address: ZERO_B256,
    },
    ///   |                    |
    /// --+-- GOVERNANCE STATE --+--
    ///   |                    |
    current_implementation: Identity = Identity::Address(Address::from(ZERO_B256)),
}

impl SRC5 for Contract {
    #[storage(read)]
    fn owner() -> State {
        _owner()
    }
}

impl PythCore for Contract {
    #[storage(read)]
    fn ema_price(price_feed_id: PriceFeedId) -> Price {
        ema_price_no_older_than(valid_time_period(), price_feed_id)
    }

    #[storage(read)]
    fn ema_price_no_older_than(time_period: u64, price_feed_id: PriceFeedId) -> Price {
        ema_price_no_older_than(time_period, price_feed_id)
    }

    #[storage(read)]
    fn ema_price_unsafe(price_feed_id: PriceFeedId) -> Price {
        ema_price_unsafe(price_feed_id)
    }

    #[storage(read), payable]
    fn parse_price_feed_updates(
        max_publish_time: u64,
        min_publish_time: u64,
        target_price_feed_ids: Vec<PriceFeedId>,
        update_data: Vec<Bytes>,
    ) -> Vec<PriceFeed> {
        require(
            msg_asset_id() == AssetId::base(),
            PythError::FeesCanOnlyBePaidInTheBaseAsset,
        );

        let required_fee = update_fee(update_data);
        require(msg_amount() >= required_fee, PythError::InsufficientFee);

        let mut output_price_feeds: Vec<PriceFeed> = Vec::with_capacity(target_price_feed_ids.len());
        let mut i = 0;
        while i < update_data.len() {
            let data = update_data.get(i).unwrap();

            match UpdateType::determine_type(data) {
                UpdateType::Accumulator(accumulator_update) => {
                    let (mut offset, digest, number_of_updates, encoded) = accumulator_update.verify_and_parse(
                        current_guardian_set_index(),
                        storage
                            .wormhole_guardian_sets,
                        storage
                            .is_valid_data_source,
                    );
                    let mut i_2 = 0;
                    while i_2 < number_of_updates {
                        let (new_offset, price_feed) = PriceFeed::extract_from_merkle_proof(digest, encoded, offset);

                        offset = new_offset;

                        if price_feed.id.is_target(target_price_feed_ids) == false {
                            i_2 += 1;
                            continue;
                        }

                        if price_feed.price.publish_time >= min_publish_time && price_feed.price.publish_time <= max_publish_time {
                            // check if output_price_feeds already contains a PriceFeed with price_feed.id, if so continue as we only want 1
                            // output PriceFeed per target ID
                            if price_feed.id.is_contained_within(output_price_feeds) {
                                i_2 += 1;
                                continue;
                            }

                            output_price_feeds.push(price_feed)
                        }

                        i_2 += 1;
                    }
                    require(offset == encoded.len(), PythError::InvalidUpdateDataLength);
                },
                UpdateType::BatchAttestation(batch_attestation_update) => {
                    let vm = WormholeVM::parse_and_verify_pyth_vm(
                        current_guardian_set_index(),
                        batch_attestation_update
                            .data,
                        storage
                            .wormhole_guardian_sets,
                        storage
                            .is_valid_data_source,
                    );

                    let (mut attestation_index, number_of_attestations, attestation_size) = parse_and_verify_batch_attestation_header(vm.payload);
                    let attestation_size_u16 = attestation_size.as_u64();

                    let mut i_2: u16 = 0;
                    while i_2 < number_of_attestations {
                        let (_, slice) = vm.payload.split_at(attestation_index + 32);
                        let (price_feed_id, _) = slice.split_at(32);
                        let price_feed_id: PriceFeedId = price_feed_id.into();

                        if price_feed_id.is_target(target_price_feed_ids) == false {
                            attestation_index += attestation_size_u16;
                            i_2 += 1;
                            continue;
                        }

                        let price_feed = PriceFeed::parse_attestation(attestation_size, vm.payload, attestation_index);

                        if price_feed.price.publish_time >= min_publish_time && price_feed.price.publish_time <= max_publish_time {
                            // check if output_price_feeds already contains a PriceFeed with price_feed.id, if so continue;
                            // as we only want 1 output PriceFeed per target ID
                            if price_feed.id.is_contained_within(output_price_feeds) {
                                attestation_index += attestation_size_u16;
                                i_2 += 1;
                                continue;
                            }

                            output_price_feeds.push(price_feed)
                        }

                        attestation_index += attestation_size_u16;
                        i_2 += 1;
                    }
                }
            }

            i += 1;
        }

        require(
            target_price_feed_ids
                .len() == output_price_feeds
                .len(),
            PythError::PriceFeedNotFoundWithinRange,
        );

        output_price_feeds
    }

    #[storage(read)]
    fn price(price_feed_id: PriceFeedId) -> Price {
        price_no_older_than(valid_time_period(), price_feed_id)
    }

    #[storage(read)]
    fn price_no_older_than(time_period: u64, price_feed_id: PriceFeedId) -> Price {
        price_no_older_than(time_period, price_feed_id)
    }

    #[storage(read)]
    fn price_unsafe(price_feed_id: PriceFeedId) -> Price {
        price_unsafe(price_feed_id)
    }

    #[storage(read)]
    fn update_fee(update_data: Vec<Bytes>) -> u64 {
        update_fee(update_data)
    }

    #[storage(read, write), payable]
    fn update_price_feeds(update_data: Vec<Bytes>) {
        update_price_feeds(update_data)
    }

    #[storage(read, write), payable]
    fn update_price_feeds_if_necessary(
        price_feed_ids: Vec<PriceFeedId>,
        publish_times: Vec<u64>,
        update_data: Vec<Bytes>,
    ) {
        require(
            price_feed_ids
                .len() == publish_times
                .len(),
            PythError::LengthOfPriceFeedIdsAndPublishTimesMustMatch,
        );

        let mut i = 0;
        while i < price_feed_ids.len() {
            if latest_publish_time(price_feed_ids.get(i).unwrap()) < publish_times.get(i).unwrap()
            {
                update_price_feeds(update_data);
                return;
            }

            i += 1;
        }
    }

    #[storage(read)]
    fn valid_time_period() -> u64 {
        valid_time_period()
    }
}

/// PythCore Private Functions ///
#[storage(read)]
fn ema_price_no_older_than(time_period: u64, price_feed_id: PriceFeedId) -> Price {
    let price = ema_price_unsafe(price_feed_id);
    let current_time = timestamp();
    require(
        current_time - price.publish_time <= time_period,
        PythError::OutdatedPrice,
    );

    price
}

#[storage(read)]
fn ema_price_unsafe(price_feed_id: PriceFeedId) -> Price {
    let price_feed = storage.latest_price_feed.get(price_feed_id).try_read();
    require(price_feed.is_some(), PythError::PriceFeedNotFound);

    price_feed.unwrap().ema_price
}

#[storage(read)]
fn price_no_older_than(time_period: u64, price_feed_id: PriceFeedId) -> Price {
    let price = price_unsafe(price_feed_id);
    let current_time = timestamp();
    require(
        current_time - price.publish_time <= time_period,
        PythError::OutdatedPrice,
    );

    price
}

#[storage(read)]
fn price_unsafe(price_feed_id: PriceFeedId) -> Price {
    let price_feed = storage.latest_price_feed.get(price_feed_id).try_read();
    require(price_feed.is_some(), PythError::PriceFeedNotFound);

    price_feed.unwrap().price
}

#[storage(read)]
fn update_fee(update_data: Vec<Bytes>) -> u64 {
    let mut total_number_of_updates = 0;
    let mut i = 0;
    while i < update_data.len() {
        let data = update_data.get(i).unwrap();

        match UpdateType::determine_type(data) {
            UpdateType::Accumulator(accumulator_update) => {
                let proof_size_offset = accumulator_update.verify();

                total_number_of_updates += accumulator_update.total_updates(proof_size_offset);
            },
            UpdateType::BatchAttestation => {
                total_number_of_updates += 1;
            },
        }

        i += 1;
    }

    total_fee(total_number_of_updates, storage.single_update_fee)
}

#[storage(read, write), payable]
fn update_price_feeds(update_data: Vec<Bytes>) {
    require(
        msg_asset_id() == AssetId::base(),
        PythError::FeesCanOnlyBePaidInTheBaseAsset,
    );

    let mut total_number_of_updates = 0;

    // let mut updated_price_feeds: Vec<PriceFeedId> = Vec::new(); // TODO: requires append for Vec
    let mut i = 0;
    while i < update_data.len() {
        let data = update_data.get(i).unwrap();

        match UpdateType::determine_type(data) {
            UpdateType::Accumulator(accumulator_update) => {
                let (number_of_updates, _updated_ids) = accumulator_update.update_price_feeds(
                    current_guardian_set_index(),
                    storage
                        .wormhole_guardian_sets,
                    storage
                        .latest_price_feed,
                    storage
                        .is_valid_data_source,
                );
                // updated_price_feeds.append(updated_ids); // TODO: requires append for Vec
                total_number_of_updates += number_of_updates;
            },
            UpdateType::BatchAttestation(batch_attestation_update) => {
                let _updated_ids = batch_attestation_update.update_price_feeds(
                    current_guardian_set_index(),
                    storage
                        .wormhole_guardian_sets,
                    storage
                        .latest_price_feed,
                    storage
                        .is_valid_data_source,
                );
                // updated_price_feeds.append(updated_ids); // TODO: requires append for Vec
                total_number_of_updates += 1;
            },
        }

        i += 1;
    }

    let required_fee = total_fee(total_number_of_updates, storage.single_update_fee);
    require(msg_amount() >= required_fee, PythError::InsufficientFee);

    // log(UpdatedPriceFeedsEvent { // TODO: requires append for Vec
    //     updated_price_feeds,
    // })
}

#[storage(read)]
fn valid_time_period() -> u64 {
    storage.valid_time_period_seconds.read()
}

#[storage(read)]
fn governance_data_source() -> DataSource {
    storage.governance_data_source.read()
}

#[storage(write)]
fn set_governance_data_source(data_source: DataSource) {
    storage.governance_data_source.write(data_source);
}

#[storage(read)]
fn governance_data_source_index() -> u32 {
    storage.governance_data_source_index.read()
}

#[storage(write)]
fn set_governance_data_source_index(index: u32) {
    storage.governance_data_source_index.write(index);
}

#[storage(read)]
fn last_executed_governance_sequence() -> u64 {
    storage.last_executed_governance_sequence.read()
}

#[storage(write)]
fn set_last_executed_governance_sequence(sequence: u64) {
    storage.last_executed_governance_sequence.write(sequence);
}

#[storage(read)]
fn chain_id() -> u16 {
    storage.chain_id.read()
}

#[storage(read)]
fn current_implementation() -> Identity {
    storage.current_implementation.read()
}

impl PythInit for Contract {
    #[storage(read, write)]
    fn constructor(
        data_sources: Vec<DataSource>,
        governance_data_source: DataSource,
        wormhole_governance_data_source: DataSource,
        single_update_fee: u64,
        valid_time_period_seconds: u64,
        wormhole_guardian_set_addresses: Vec<b256>,
        wormhole_guardian_set_index: u32,
        chain_id: u16,
    ) {
        // This function sets the passed identity as the initial owner. https://github.com/FuelLabs/sway-libs/blob/8045a19e3297599750abdf6300c11e9927a29d40/libs/src/ownership.sw#L127-L138
        initialize_ownership(DEPLOYER);
        // This function ensures that the sender is the owner. https://github.com/FuelLabs/sway-libs/blob/8045a19e3297599750abdf6300c11e9927a29d40/libs/src/ownership.sw#L59-L65
        only_owner();

        require(data_sources.len() > 0, PythError::InvalidDataSourcesLength);

        let mut i = 0;
        while i < data_sources.len() {
            let data_source = data_sources.get(i).unwrap();
            storage.is_valid_data_source.insert(data_source, true);
            storage.valid_data_sources.push(data_source);

            i += 1;
        }
        storage
            .latest_price_feed
            .write(StorageMap::<PriceFeedId, PriceFeed> {});

        storage
            .valid_time_period_seconds
            .write(valid_time_period_seconds);
        storage.single_update_fee.write(single_update_fee);

        let guardian_length: u8 = wormhole_guardian_set_addresses.len().try_as_u8().unwrap();
        let mut new_guardian_set = StorageGuardianSet::new(
            0,
            StorageKey::<StorageVec<b256>>::new(
                sha256(("guardian_set_keys", wormhole_guardian_set_index)),
                0,
                ZERO_B256,
            ),
        );
        let mut i: u8 = 0;
        while i < guardian_length {
            let key: b256 = wormhole_guardian_set_addresses.get(i.as_u64()).unwrap();
            new_guardian_set.keys.push(key);
            i += 1;
        }

        storage
            .wormhole_guardian_set_index
            .write(wormhole_guardian_set_index);
        storage
            .wormhole_guardian_sets
            .insert(wormhole_guardian_set_index, new_guardian_set);

        storage.governance_data_source.write(governance_data_source);
        storage
            .wormhole_governance_data_source
            .write(wormhole_governance_data_source);
        storage.governance_data_source_index.write(0);
        storage
            .wormhole_consumed_governance_actions
            .write(StorageMap::<b256, bool> {});
        storage.chain_id.write(chain_id);
        storage.last_executed_governance_sequence.write(0);

        storage
            .current_implementation
            .write(Identity::Address(Address::from(ZERO_B256)));

        // This function revokes ownership of the current owner and disallows any new owners. https://github.com/FuelLabs/sway-libs/blob/8045a19e3297599750abdf6300c11e9927a29d40/libs/src/ownership.sw#L89-L99
        renounce_ownership();

        log(ConstructedEvent {
            guardian_set_index: wormhole_guardian_set_index,
        })
    }
}

impl PythInfo for Contract {
    #[storage(read)]
    fn valid_data_sources() -> Vec<DataSource> {
        storage.valid_data_sources.load_vec()
    }

    #[storage(read)]
    fn latest_publish_time(price_feed_id: PriceFeedId) -> u64 {
        latest_publish_time(price_feed_id)
    }

    #[storage(read)]
    fn price_feed_exists(price_feed_id: PriceFeedId) -> bool {
        match storage.latest_price_feed.get(price_feed_id).try_read() {
            Some(_) => true,
            None => false,
        }
    }

    #[storage(read)]
    fn price_feed_unsafe(price_feed_id: PriceFeedId) -> PriceFeed {
        let price_feed = storage.latest_price_feed.get(price_feed_id).try_read();
        require(price_feed.is_some(), PythError::PriceFeedNotFound);
        price_feed.unwrap()
    }

    #[storage(read)]
    fn single_update_fee() -> u64 {
        storage.single_update_fee.read()
    }

    #[storage(read)]
    fn is_valid_data_source(data_source: DataSource) -> bool {
        data_source.is_valid_data_source(storage.is_valid_data_source)
    }

    #[storage(read)]
    fn last_executed_governance_sequence() -> u64 {
        last_executed_governance_sequence()
    }

    #[storage(read)]
    fn chain_id() -> u16 {
        chain_id()
    }
}

/// PythInfo Private Functions ///
#[storage(read)]
fn latest_publish_time(price_feed_id: PriceFeedId) -> u64 {
    match storage.latest_price_feed.get(price_feed_id).try_read() {
        Some(price_feed) => price_feed.price.publish_time,
        None => 0,
    }
}

impl WormholeGuardians for Contract {
    #[storage(read)]
    fn current_guardian_set_index() -> u32 {
        current_guardian_set_index()
    }

    #[storage(read)]
    fn current_wormhole_provider() -> DataSource {
        current_wormhole_provider()
    }

    #[storage(read)]
    fn guardian_set(index: u32) -> GuardianSet {
        let stored_guardian_set = storage.wormhole_guardian_sets.get(index).try_read();
        require(
            stored_guardian_set
                .is_some(),
            PythError::GuardianSetNotFound,
        );
        GuardianSet::from_stored(stored_guardian_set.unwrap())
    }

    #[storage(read)]
    fn governance_action_is_consumed(governance_action_hash: b256) -> bool {
        governance_action_is_consumed(governance_action_hash)
    }

    #[storage(read, write)]
    fn submit_new_guardian_set(encoded_vm: Bytes) {
        submit_new_guardian_set(encoded_vm)
    }
}

/// WormholeGuardians Private Functions ///
#[storage(read)]
fn current_guardian_set_index() -> u32 {
    storage.wormhole_guardian_set_index.read()
}

#[storage(read)]
fn current_wormhole_provider() -> DataSource {
    storage.wormhole_governance_data_source.read()
}

#[storage(read)]
fn governance_action_is_consumed(governance_action_hash: b256) -> bool {
    match storage.wormhole_consumed_governance_actions.get(governance_action_hash).try_read() {
        Some(bool_) => bool_,
        None => false,
    }
}

#[storage(read, write)]
fn submit_new_guardian_set(encoded_vm: Bytes) {
    let vm: WormholeVM = WormholeVM::parse_and_verify_wormhole_vm(
        current_guardian_set_index(),
        encoded_vm,
        storage
            .wormhole_guardian_sets,
    );
    require(
        vm.guardian_set_index == current_guardian_set_index(),
        WormholeError::NotSignedByCurrentGuardianSet,
    );
    let current_wormhole_provider: DataSource = current_wormhole_provider();
    require(
        vm.emitter_chain_id == current_wormhole_provider
            .chain_id,
        WormholeError::InvalidGovernanceChain,
    );
    require(
        vm.emitter_address == current_wormhole_provider
            .emitter_address,
        WormholeError::InvalidGovernanceContract,
    );
    require(
        governance_action_is_consumed(vm.governance_action_hash) == false,
        WormholeError::GovernanceActionAlreadyConsumed,
    );

    let current_guardian_set_index: u32 = current_guardian_set_index();
    let upgrade: GuardianSetUpgrade = GuardianSetUpgrade::parse_encoded_upgrade(current_guardian_set_index, vm.payload);

    storage
        .wormhole_consumed_governance_actions
        .insert(vm.governance_action_hash, true);

    // Set expiry if current GuardianSet exists
    let current_guardian_set = storage.wormhole_guardian_sets.get(current_guardian_set_index).try_read();
    if current_guardian_set.is_some() {
        let mut current_guardian_set = current_guardian_set.unwrap();
        current_guardian_set.expiration_time = timestamp() + GUARDIAN_SET_EXPIRATION_TIME_SECONDS;
        storage
            .wormhole_guardian_sets
            .insert(current_guardian_set_index, current_guardian_set);
    }

    storage
        .wormhole_guardian_sets
        .insert(upgrade.new_guardian_set_index, upgrade.new_guardian_set);
    storage
        .wormhole_guardian_set_index
        .write(upgrade.new_guardian_set_index);

    log(NewGuardianSetEvent {
        governance_action_hash: vm.governance_action_hash,
        new_guardian_set_index: upgrade.new_guardian_set_index,
    })
}

/// Transfer the governance data source to a new value with sanity checks to ensure the new governance data source can manage the contract.
#[storage(read, write)]
fn authorize_governance_data_source_transfer(
    payload: AuthorizeGovernanceDataSourceTransferPayload,
) {
    let old_governance_data_source = governance_data_source();

    // Parse and verify the VAA contained in the payload to ensure it's valid and can manage the contract
    let vm: WormholeVM = WormholeVM::parse_and_verify_wormhole_vm(
        current_guardian_set_index(),
        payload
            .claim_vaa,
        storage
            .wormhole_guardian_sets,
    );

    let gi = GovernanceInstruction::parse_governance_instruction(vm.payload);
    require(
        gi.target_chain_id == chain_id() || gi.target_chain_id == 0,
        PythError::InvalidGovernanceTarget,
    );

    require(
        match gi.action {
            GovernanceAction::RequestGovernanceDataSourceTransfer => true,
            _ => false,
        },
        PythError::InvalidGovernanceMessage,
    );

    let claim_payload = GovernanceInstruction::parse_request_governance_data_source_transfer_payload(gi.payload);

    require(
        governance_data_source_index() < claim_payload
            .governance_data_source_index,
        PythError::OldGovernanceMessage,
    );

    set_governance_data_source_index(claim_payload.governance_data_source_index);

    let new_governance_data_source = DataSource {
        chain_id: vm.emitter_chain_id,
        emitter_address: vm.emitter_address,
    };

    set_governance_data_source(new_governance_data_source);

    // Setting the last executed governance to the claimVaa sequence to avoid using older sequences.
    set_last_executed_governance_sequence(vm.sequence);

    log(GovernanceDataSourceSetEvent {
        old_data_source: old_governance_data_source,
        new_data_source: new_governance_data_source,
        initial_sequence: vm.sequence,
    });
}

#[storage(read, write)]
fn set_data_sources(payload: SetDataSourcesPayload) {
    let old_data_sources = storage.valid_data_sources.load_vec();

    let mut i = 0;
    while i < old_data_sources.len() {
        let data_source = old_data_sources.get(i).unwrap();
        storage.is_valid_data_source.insert(data_source, false);
        i += 1;
    }

    // Clear the current list of valid data sources
    storage.valid_data_sources.clear();

    i = 0;
    // Add new data sources from the payload and mark them as valid
    while i < payload.data_sources.len() {
        let data_source = payload.data_sources.get(i).unwrap();
        storage.valid_data_sources.push(data_source);
        storage.is_valid_data_source.insert(data_source, true);

        i += 1;
    }

    // Emit an event with the old and new data sources
    log(DataSourcesSetEvent {
        old_data_sources: old_data_sources,
        new_data_sources: storage.valid_data_sources.load_vec(),
    });
}

#[storage(read, write)]
fn set_fee(payload: SetFeePayload) {
    let old_fee = storage.single_update_fee.read();
    storage.single_update_fee.write(payload.new_fee);

    log(FeeSetEvent {
        old_fee,
        new_fee: payload.new_fee,
    });
}

#[storage(read, write)]
fn set_valid_period(payload: SetValidPeriodPayload) {
    let old_valid_period = storage.valid_time_period_seconds.read();
    storage
        .valid_time_period_seconds
        .write(payload.new_valid_period);

    log(ValidPeriodSetEvent {
        old_valid_period,
        new_valid_period: payload.new_valid_period,
    });
}

abi PythGovernance {
    #[storage(read)]
    fn governance_data_source() -> DataSource;

    #[storage(read, write)]
    fn execute_governance_instruction(encoded_vm: Bytes);
}

impl PythGovernance for Contract {
    #[storage(read)]
    fn governance_data_source() -> DataSource {
        governance_data_source()
    }

    #[storage(read, write)]
    fn execute_governance_instruction(encoded_vm: Bytes) {
        execute_governance_instruction(encoded_vm)
    }
}

#[storage(read, write)]
fn execute_governance_instruction(encoded_vm: Bytes) {
    let vm = verify_governance_vm(encoded_vm);
    // Log so that the WormholeVM struct will show up in the ABI and can be used in the tests
    log(vm);

    let gi = GovernanceInstruction::parse_governance_instruction(vm.payload);
    // Log so that the GovernanceInstruction struct will show up in the ABI and can be used in the tests
    log(gi);

    require(
        gi.target_chain_id == chain_id() || gi.target_chain_id == 0,
        PythError::InvalidGovernanceTarget,
    );

    match gi.action {
        GovernanceAction::UpgradeContract => {
            require(gi.target_chain_id != 0, PythError::InvalidGovernanceTarget);
            // TODO: implement upgrade_upgradeable_contract(uc) when Fuel releases the upgrade standard library;
            log("Upgrade functionality not implemented");
            revert(0u64);
        },
        GovernanceAction::AuthorizeGovernanceDataSourceTransfer => {
            let agdst = GovernanceInstruction::parse_authorize_governance_data_source_transfer_payload(gi.payload);
            log(agdst);
            authorize_governance_data_source_transfer(agdst);
        },
        GovernanceAction::SetDataSources => {
            let sdsp = GovernanceInstruction::parse_set_data_sources_payload(gi.payload);
            log(sdsp);
            set_data_sources(sdsp);
        },
        GovernanceAction::SetFee => {
            let sf = GovernanceInstruction::parse_set_fee_payload(gi.payload);
            log(sf);
            set_fee(sf);
        },
        GovernanceAction::SetValidPeriod => {
            let svp = GovernanceInstruction::parse_set_valid_period_payload(gi.payload);
            log(svp);
            set_valid_period(svp);
        },
        GovernanceAction::RequestGovernanceDataSourceTransfer => {
            // RequestGovernanceDataSourceTransfer can be only part of AuthorizeGovernanceDataSourceTransfer message
            // The `revert` function only accepts u64, so as
            // a workaround we use require.
            require(false, PythError::InvalidGovernanceMessage);
        },
        _ => {
            // The `revert` function only accepts u64, so as
            // a workaround we use require.
            require(false, PythError::InvalidGovernanceMessage);
        }
    }
}

#[storage(read, write)]
fn verify_governance_vm(encoded_vm: Bytes) -> WormholeVM {
    let vm: WormholeVM = WormholeVM::parse_and_verify_wormhole_vm(
        current_guardian_set_index(),
        encoded_vm,
        storage
            .wormhole_guardian_sets,
    );

    require(
        storage
            .governance_data_source
            .read()
            .is_valid_governance_data_source(vm.emitter_chain_id, vm.emitter_address),
        PythError::InvalidGovernanceDataSource,
    );

    require(
        vm.sequence > last_executed_governance_sequence(),
        PythError::OldGovernanceMessage,
    );

    set_last_executed_governance_sequence(vm.sequence);
    vm
}
