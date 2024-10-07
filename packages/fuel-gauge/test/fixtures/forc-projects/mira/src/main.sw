contract;

use std::{
    asset::{
        burn,
        mint,
        mint_to,
        transfer,
    },
    bytes::Bytes,
    call_frames::msg_asset_id,
    context::{
        msg_amount,
        this_balance,
    },
    hash::Hash,
    storage::storage_string::*,
    storage::storage_vec::*,
    string::String,
};
use standards::{
    src20::{
        SetDecimalsEvent,
        SetNameEvent,
        SetSymbolEvent,
        SRC20,
        TotalSupplyEvent,
    },
    src5::{
        SRC5,
        State,
    },
};
use utils::utils::{build_lp_name, get_lp_asset, is_stable, validate_pool_id};
use utils::src20_utils::get_symbol_and_decimals;
use math::pool_math::{
    calculate_fee,
    get_max_protocol_fee,
    initial_liquidity,
    min,
    proportional_value,
    validate_curve,
};
use interfaces::{callee::IBaseCallee, hook::IBaseHook, mira_amm::MiraAMM};
use interfaces::data_structures::{Asset, PoolId, PoolInfo, PoolMetadata,};
use interfaces::errors::{AmmError, InputError};
use interfaces::events::{BurnEvent, CreatePoolEvent, MintEvent, SwapEvent};
use sway_libs::{
    ownership::{
        _owner,
        initialize_ownership,
        only_owner,
        transfer_ownership,
    },
    reentrancy::reentrancy_guard,
};

configurable {
    /// Liquidity provider fee for volatile pools. 0,3%, in basis points
    LP_FEE_VOLATILE: u64 = 30,
    /// Liquidity provider fee for stable pools. 0,05%, in basis points
    LP_FEE_STABLE: u64 = 5,
}

storage {
    /// Pools storage
    pools: StorageMap<PoolId, PoolInfo> = StorageMap {},
    /// Total number of pools
    total_pools: u64 = 0,
    /// Total reserves of specific assets across all pools
    total_reserves: StorageMap<AssetId, u64> = StorageMap {},
    /// The total supply of coins for a specific asset minted by this contract.
    lp_total_supply: StorageMap<AssetId, u64> = StorageMap {},
    /// The name of a specific asset minted by this contract.
    lp_name: StorageMap<AssetId, StorageString> = StorageMap {},
    /// Protocol fees in basis points for volatile and stable pools, respectively.
    protocol_fees: (u64, u64) = (0, 0),
    /// Hook to call on all reserve updates.
    hook: Option<ContractId> = None,
}

const MINIMUM_LIQUIDITY: u64 = 1000;
const LP_TOKEN_DECIMALS: u8 = 9;
const LP_TOKEN_SYMBOL = __to_str_array("MIRA-LP");

#[storage(write)]
fn initialize_lp_asset(sender: Identity, lp_asset: AssetId, name: String) {
    storage.lp_name.get(lp_asset).write_slice(name);
    log(SetNameEvent {
        asset: lp_asset,
        name: Some(name),
        sender,
    });

    log(SetSymbolEvent {
        asset: lp_asset,
        symbol: Some(String::from_ascii_str(from_str_array(LP_TOKEN_SYMBOL))),
        sender,
    });

    log(SetDecimalsEvent {
        asset: lp_asset,
        decimals: LP_TOKEN_DECIMALS,
        sender,
    });
}

#[storage(write)]
fn update_total_supply(sender: Identity, lp_asset: AssetId, new_supply: u64) {
    storage.lp_total_supply.insert(lp_asset, new_supply);

    log(TotalSupplyEvent {
        asset: lp_asset,
        supply: new_supply,
        sender,
    });
}

#[storage(read)]
fn get_pool_option(pool_id: PoolId) -> Option<PoolInfo> {
    validate_pool_id(pool_id);
    storage.pools.get(pool_id).try_read()
}

#[storage(read)]
fn get_pool(pool_id: PoolId) -> PoolInfo {
    let pool = get_pool_option(pool_id);
    require(pool.is_some(), InputError::PoolDoesNotExist(pool_id));
    pool.unwrap()
}

#[storage(read)]
fn get_total_reserve(asset_id: AssetId) -> u64 {
    storage.total_reserves.get(asset_id).try_read().unwrap_or(0)
}

#[storage(read, write)]
fn update_total_reserve(asset_id: AssetId, amount_in: u64, amount_out: u64) {
    let old_reserve = get_total_reserve(asset_id);
    let new_reserve = old_reserve + amount_in - amount_out;
    let balance = this_balance(asset_id);
    require(
        balance >= new_reserve,
        InputError::PoolInvariantViolation((balance, new_reserve)),
    );
    storage.total_reserves.insert(asset_id, new_reserve);
}

#[storage(read)]
fn get_lp_total_supply(asset_id: AssetId) -> Option<u64> {
    storage.lp_total_supply.get(asset_id).try_read()
}

#[storage(read)]
fn lp_asset_exists(asset: AssetId) -> bool {
    get_lp_total_supply(asset).is_some()
}

#[storage(read, write)]
fn initialize_pool(
    pool_id: PoolId,
    decimals_0: u8,
    decimals_1: u8,
    lp_name: String,
) {
    require(
        get_pool_option(pool_id)
            .is_none(),
        InputError::PoolAlreadyExists(pool_id),
    );
    let (_, pool_lp_asset) = get_lp_asset(pool_id);
    require(
        !lp_asset_exists(pool_lp_asset),
        InputError::LPTokenHashCollision,
    );

    let pool_info = PoolInfo::new(pool_id, decimals_0, decimals_1);
    storage.pools.insert(pool_id, pool_info);
    storage.total_pools.write(storage.total_pools.read() + 1);

    let sender = msg_sender().unwrap();
    initialize_lp_asset(sender, pool_lp_asset, lp_name);
    update_total_supply(sender, pool_lp_asset, 0);
}

#[storage(read, write)]
fn mint_lp_asset(pool_id: PoolId, to: Identity, amount: u64) -> Asset {
    let (pool_lp_asset_sub_id, pool_lp_asset) = get_lp_asset(pool_id);
    // must be present in the storage
    let lp_total_supply = get_lp_total_supply(pool_lp_asset).unwrap();
    update_total_supply(
        msg_sender()
            .unwrap(),
        pool_lp_asset,
        lp_total_supply + amount,
    );
    mint_to(to, pool_lp_asset_sub_id, amount);
    Asset::new(pool_lp_asset, amount)
}

/// Burns the provided amount of LP token. Returns the initial total supply, prior the burn operation
#[storage(read, write)]
fn burn_lp_asset(pool_id: PoolId, burned_liquidity: Asset) -> u64 {
    let (pool_lp_asset_sub_id, pool_lp_asset) = get_lp_asset(pool_id);
    require(
        burned_liquidity
            .id == pool_lp_asset,
        InputError::InvalidAsset(burned_liquidity.id),
    );
    require(burned_liquidity.amount > 0, InputError::ZeroInputAmount);

    // must be present in the storage
    let lp_total_supply = get_lp_total_supply(pool_lp_asset).unwrap();
    require(
        lp_total_supply >= burned_liquidity
            .amount,
        AmmError::InsufficientLiquidity,
    );

    update_total_supply(
        msg_sender()
            .unwrap(),
        pool_lp_asset,
        lp_total_supply - burned_liquidity
            .amount,
    );
    burn(pool_lp_asset_sub_id, burned_liquidity.amount);
    lp_total_supply
}

#[storage(read)]
fn get_pool_liquidity(pool_id: PoolId) -> Asset {
    let (_, pool_lp_asset) = get_lp_asset(pool_id);
    // must be present in the storage
    let liquidity = get_lp_total_supply(pool_lp_asset).unwrap();
    Asset::new(pool_lp_asset, liquidity)
}

#[storage(read)]
fn get_amount_in(asset_id: AssetId) -> u64 {
    let total_reserve = get_total_reserve(asset_id);
    let balance = this_balance(asset_id);
    balance - total_reserve
}

#[storage(read)]
fn get_amount_in_accounting_out(asset_id: AssetId, amount_out: u64, to: Identity) -> (u64, u64) {
    let total_reserve = get_total_reserve(asset_id);
    let balance = if (to == Identity::ContractId(ContractId::this())) {
        // Account cases when assets are transferred to this contract (usually in multihops).
        // We don't account them as part of pool balances, so that they're treated as inputs
        // for the next swap.
        this_balance(asset_id) - amount_out
    } else {
        this_balance(asset_id)
    };
    let after_out = total_reserve - amount_out;
    let amount_in = if balance > after_out {
        balance - after_out
    } else {
        0
    };
    (balance, amount_in)
}

#[storage(read, write)]
fn update_reserves(
    pool: PoolInfo,
    amount_0_in: u64,
    amount_1_in: u64,
    amount_0_out: u64,
    amount_1_out: u64,
) {
    let reserve_0 = pool.reserve_0 + amount_0_in - amount_0_out;
    let reserve_1 = pool.reserve_1 + amount_1_in - amount_1_out;
    let updated_pool = pool.copy_with_reserves(reserve_0, reserve_1);
    storage.pools.insert(pool.id, updated_pool);
    update_total_reserve(pool.id.0, amount_0_in, amount_0_out);
    update_total_reserve(pool.id.1, amount_1_in, amount_1_out);
}

fn transfer_assets(
    pool_id: PoolId,
    to: Identity,
    asset_0_out: u64,
    asset_1_out: u64,
) {
    if (asset_0_out > 0) {
        transfer(to, pool_id.0, asset_0_out);
    }
    if (asset_1_out > 0) {
        transfer(to, pool_id.1, asset_1_out);
    }
}

#[storage(read)]
fn get_protocol_fees() -> (u64, u64) {
    storage.protocol_fees.read()
}

fn get_lp_pool_fee(pool_id: PoolId, amount_0: u64, amount_1: u64) -> (u64, u64) {
    let fee = if is_stable(pool_id) {
        LP_FEE_STABLE
    } else {
        LP_FEE_VOLATILE
    };
    (calculate_fee(amount_0, fee), calculate_fee(amount_1, fee))
}

#[storage(read)]
fn get_protocol_pool_fee(pool_id: PoolId, amount_0: u64, amount_1: u64) -> (u64, u64) {
    let (protocol_fee_volatile, protocol_fee_stable) = get_protocol_fees();
    let fee = if is_stable(pool_id) {
        protocol_fee_stable
    } else {
        protocol_fee_volatile
    };
    (calculate_fee(amount_0, fee), calculate_fee(amount_1, fee))
}

#[storage(read)]
fn get_fee_recipient() -> Option<Identity> {
    match _owner() {
        State::Initialized(owner) => Some(owner),
        _ => None,
    }
}

impl SRC5 for Contract {
    #[storage(read)]
    fn owner() -> State {
        _owner()
    }
}

#[storage(read)]
fn get_hook() -> Option<ContractId> {
    storage.hook.read()
}

#[storage(read)]
fn call_hook(
    pool_id: PoolId,
    to: Identity,
    asset_0_in: u64,
    asset_1_in: u64,
    asset_0_out: u64,
    asset_1_out: u64,
    lp_token: u64,
) {
    if let Some(hook) = get_hook() {
        abi(IBaseHook, hook
            .into())
            .hook(
                pool_id,
                msg_sender()
                    .unwrap(),
                to,
                asset_0_in,
                asset_1_in,
                asset_0_out,
                asset_1_out,
                lp_token,
            );
    }
}

impl SRC20 for Contract {
    #[storage(read)]
    fn total_assets() -> u64 {
        storage.total_pools.read()
    }

    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64> {
        get_lp_total_supply(asset)
    }

    #[storage(read)]
    fn name(asset: AssetId) -> Option<String> {
        storage.lp_name.get(asset).read_slice()
    }

    #[storage(read)]
    fn symbol(asset: AssetId) -> Option<String> {
        if lp_asset_exists(asset) {
            Some(String::from_ascii_str(from_str_array(LP_TOKEN_SYMBOL)))
        } else {
            None
        }
    }

    #[storage(read)]
    fn decimals(asset: AssetId) -> Option<u8> {
        if lp_asset_exists(asset) {
            Some(LP_TOKEN_DECIMALS)
        } else {
            None
        }
    }
}

impl MiraAMM for Contract {
    #[storage(read, write)]
    fn create_pool(
        token_0_contract_id: ContractId,
        token_0_sub_id: SubId,
        token_1_contract_id: ContractId,
        token_1_sub_id: SubId,
        is_stable: bool,
    ) -> PoolId {
        reentrancy_guard();
        let token_0_id = AssetId::new(token_0_contract_id, token_0_sub_id);
        let token_1_id = AssetId::new(token_1_contract_id, token_1_sub_id);
        let pool_id: PoolId = (token_0_id, token_1_id, is_stable);

        let (symbol_0, decimals_0) = get_symbol_and_decimals(token_0_contract_id, token_0_id);
        let (symbol_1, decimals_1) = get_symbol_and_decimals(token_1_contract_id, token_1_id);
        let lp_name = build_lp_name(symbol_0, symbol_1);

        initialize_pool(pool_id, decimals_0, decimals_1, lp_name);

        log(CreatePoolEvent {
            pool_id,
            decimals_0,
            decimals_1,
        });
        pool_id
    }

    #[storage(read)]
    fn get_fee_recipient_2() -> Option<Identity> {
        match _owner() {
            State::Initialized(owner) => Some(owner),
            _ => None,
        }
    }

    #[storage(read)]
    fn get_fee_recipient_3() -> Identity {
        get_fee_recipient().unwrap()
    }

    #[storage(read)]
    fn pool_metadata(pool_id: PoolId) -> Option<PoolMetadata> {
        match get_pool_option(pool_id) {
            Some(pool) => Some(PoolMetadata::from_pool_and_liquidity(pool, get_pool_liquidity(pool_id))),
            None => None,
        }
    }

    #[storage(read)]
    fn fees() -> (u64, u64, u64, u64) {
        let (protocol_fee_volatile, protocol_fee_stable) = get_protocol_fees();
        (LP_FEE_VOLATILE, LP_FEE_STABLE, protocol_fee_volatile, protocol_fee_stable)
    }

    #[storage(write)]
    fn set_protocol_fees(volatile_fee: u64, stable_fee: u64) {
        only_owner();
        // protocol fees cannot exceed 20% of the LP fees
        require(
            volatile_fee <= get_max_protocol_fee(LP_FEE_VOLATILE) && stable_fee <= get_max_protocol_fee(LP_FEE_STABLE),
            InputError::ProtocolFeesAreTooHigh,
        );
        storage.protocol_fees.write((volatile_fee, stable_fee));
    }

    #[storage(write)]
    fn set_hook(contract_id: Option<ContractId>) {
        only_owner();
        // sway doesn't allow to check if a contract id implements an interface
        storage.hook.write(contract_id);
    }

    #[storage(read)]
    fn hook() -> Option<ContractId> {
        get_hook()
    }

    #[storage(read)]
    fn test_revert_0() -> u8 {
        _owner();

        10
    }

    #[storage(read, write)]
    fn mint(pool_id: PoolId, to: Identity) -> Asset {
        log(1);
        reentrancy_guard();
        log(2);
        let mut pool = get_pool(pool_id);
        log(3);
        let asset_0_in = get_amount_in(pool_id.0);
        log(4);
        let fee_dummy = get_fee_recipient().unwrap();
        let asset_1_in = get_amount_in(pool_id.1);
        log(5);

        let total_liquidity = get_pool_liquidity(pool_id).amount;
        log(6);


        log(7);
        let dummy = mint_lp_asset(pool_id, get_fee_recipient().unwrap(), MINIMUM_LIQUIDITY);
        log(8);
        let init_liquidity = initial_liquidity(asset_0_in, asset_1_in);

        log(9);

        require(
            init_liquidity > MINIMUM_LIQUIDITY,
            AmmError::CannotAddLessThanMinimumLiquidity,
        );

        log(10);
        proportional_value(asset_0_in, total_liquidity, pool.reserve_0);
        log(11);
        proportional_value(asset_1_in, total_liquidity, pool.reserve_1);
        log(12);
        log(total_liquidity);
        let added_liquidity: u64 = if total_liquidity == 0 {
            let _ = mint_lp_asset(pool_id, get_fee_recipient().unwrap(), MINIMUM_LIQUIDITY);
            let init_liquidity = initial_liquidity(asset_0_in, asset_1_in);
            require(
                init_liquidity > MINIMUM_LIQUIDITY,
                AmmError::CannotAddLessThanMinimumLiquidity,
            );
            init_liquidity - MINIMUM_LIQUIDITY
        } else {
            min(
                proportional_value(asset_0_in, total_liquidity, pool.reserve_0),
                proportional_value(asset_1_in, total_liquidity, pool.reserve_1),
            )
        };
        log(13);
        require(added_liquidity > 0, AmmError::NoLiquidityAdded);
        log(14);

        let minted = mint_lp_asset(pool_id, to, added_liquidity);
        log(15);
        update_reserves(pool, asset_0_in, asset_1_in, 0, 0);
        log(16);

        log(MintEvent {
            pool_id,
            recipient: to,
            liquidity: minted,
            asset_0_in,
            asset_1_in,
        });
        log(17);

        call_hook(pool_id, to, asset_0_in, asset_1_in, 0, 0, minted.amount);
        log(18);

        minted
    }

    #[payable]
    #[storage(read, write)]
    fn burn(pool_id: PoolId, to: Identity) -> (u64, u64) {
        reentrancy_guard();

        let burned_liquidity = Asset::new(msg_asset_id(), msg_amount());
        let total_liquidity = burn_lp_asset(pool_id, burned_liquidity);

        let mut pool = get_pool(pool_id);
        let asset_0_out = proportional_value(burned_liquidity.amount, pool.reserve_0, total_liquidity);
        let asset_1_out = proportional_value(burned_liquidity.amount, pool.reserve_1, total_liquidity);

        transfer(to, pool_id.0, asset_0_out);
        transfer(to, pool_id.1, asset_1_out);

        update_reserves(pool, 0, 0, asset_0_out, asset_1_out);

        log(BurnEvent {
            pool_id,
            recipient: to,
            liquidity: burned_liquidity,
            asset_0_out,
            asset_1_out,
        });

        call_hook(
            pool_id,
            to,
            0,
            0,
            asset_0_out,
            asset_1_out,
            burned_liquidity
                .amount,
        );
        (asset_0_out, asset_1_out)
    }

    #[payable]
    #[storage(read, write)]
    fn swap(
        pool_id: PoolId,
        asset_0_out: u64,
        asset_1_out: u64,
        to: Identity,
        data: Option<Bytes>,
    ) {
        reentrancy_guard();
        let mut pool = get_pool(pool_id);
        require(
            asset_0_out > 0 || asset_1_out > 0,
            InputError::ZeroOutputAmount,
        );
        require(
            asset_0_out < pool.reserve_0 && asset_1_out < pool.reserve_1,
            AmmError::InsufficientLiquidity,
        );
        // Optimistically transfer assets
        transfer_assets(pool_id, to, asset_0_out, asset_1_out);

        if let Some(d) = data {
            abi(IBaseCallee, to
                .as_contract_id()
                .unwrap()
                .into())
                .hook(msg_sender().unwrap(), asset_0_out, asset_1_out, d);
        }

        let (balance_0, asset_0_in) = get_amount_in_accounting_out(pool_id.0, asset_0_out, to);
        let (balance_1, asset_1_in) = get_amount_in_accounting_out(pool_id.1, asset_1_out, to);
        require(
            asset_0_in > 0 || asset_1_in > 0,
            InputError::ZeroInputAmount,
        );

        let (protocol_fee_0, protocol_fee_1) = get_protocol_pool_fee(pool_id, asset_0_in, asset_1_in);
        let (lp_fee_0, lp_fee_1) = get_lp_pool_fee(pool_id, asset_0_in, asset_1_in);
        transfer_assets(
            pool_id,
            get_fee_recipient()
                .unwrap(),
            protocol_fee_0,
            protocol_fee_1,
        );

        let asset_0_in_adjusted = asset_0_in - protocol_fee_0;
        let asset_1_in_adjusted = asset_1_in - protocol_fee_1;
        let balance_0_adjusted = balance_0 - lp_fee_0 - protocol_fee_0;
        let balance_1_adjusted = balance_1 - lp_fee_1 - protocol_fee_1;

        validate_curve(
            is_stable(pool_id),
            balance_0_adjusted,
            balance_1_adjusted,
            pool.reserve_0,
            pool.reserve_1,
            pool.decimals_0,
            pool.decimals_1,
        );
        update_reserves(
            pool,
            asset_0_in_adjusted,
            asset_1_in_adjusted,
            asset_0_out,
            asset_1_out,
        );

        log(SwapEvent {
            pool_id,
            recipient: to,
            asset_0_in,
            asset_1_in,
            asset_0_out,
            asset_1_out,
        });

        call_hook(
            pool_id,
            to,
            asset_0_in,
            asset_1_in,
            asset_0_out,
            asset_1_out,
            0,
        );
    }

    #[storage(read, write)]
    fn transfer_ownership(new_owner: Identity) {
        if _owner() == State::Uninitialized {
            initialize_ownership(new_owner);
        } else {
            transfer_ownership(new_owner);
        }
    }
}
