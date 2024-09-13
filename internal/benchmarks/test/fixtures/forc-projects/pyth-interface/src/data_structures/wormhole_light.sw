library;

use ::data_structures::data_source::*;
use ::errors::WormholeError;

use std::{
    array_conversions::{
        b256::*,
        u16::*,
        u32::*,
    },
    b512::B512,
    block::timestamp,
    bytes::Bytes,
    constants::ZERO_B256,
    hash::{
        Hash,
        keccak256,
        sha256,
    },
    storage::storage_vec::*,
    vm::evm::ecr::ec_recover_evm_address,
};

pub const UPGRADE_MODULE: b256 = 0x00000000000000000000000000000000000000000000000000000000436f7265;

pub struct GuardianSet {
    pub expiration_time: u64,
    pub keys: Vec<b256>,
}

impl GuardianSet {
    #[storage(read)]
    pub fn from_stored(stored: StorageGuardianSet) -> Self {
        Self {
            expiration_time: stored.expiration_time,
            keys: stored.keys.load_vec(),
        }
    }
}

pub struct StorageGuardianSet {
    pub expiration_time: u64,
    pub keys: StorageKey<StorageVec<b256>>,
}

impl StorageGuardianSet {
    pub fn new(expiration_time: u64, keys: StorageKey<StorageVec<b256>>) -> Self {
        StorageGuardianSet {
            expiration_time,
            keys,
        }
    }
}

pub struct GuardianSetUpgrade {
    pub action: u8,
    pub chain: u16,
    pub module: b256,
    pub new_guardian_set: StorageGuardianSet,
    pub new_guardian_set_index: u32,
}

impl GuardianSetUpgrade {
    pub fn new(
        action: u8,
        chain: u16,
        module: b256,
        new_guardian_set: StorageGuardianSet,
        new_guardian_set_index: u32,
    ) -> Self {
        GuardianSetUpgrade {
            action,
            chain,
            module,
            new_guardian_set,
            new_guardian_set_index,
        }
    }
}

impl GuardianSetUpgrade {
    #[storage(read, write)]
    pub fn parse_encoded_upgrade(current_guardian_set_index: u32, encoded_upgrade: Bytes) -> Self {
        let mut index = 0;
        let (_, slice) = encoded_upgrade.split_at(index);
        let (module, _) = slice.split_at(32);
        let module: b256 = module.into();
        require(module == UPGRADE_MODULE, WormholeError::InvalidModule);
        index += 32;
        let action = encoded_upgrade.get(index).unwrap();
        require(action == 2, WormholeError::InvalidGovernanceAction);
        index += 1;
        let chain = u16::from_be_bytes([encoded_upgrade.get(index).unwrap(), encoded_upgrade.get(index + 1).unwrap()]);
        index += 2;
        let new_guardian_set_index = u32::from_be_bytes([
            encoded_upgrade.get(index).unwrap(),
            encoded_upgrade.get(index + 1).unwrap(),
            encoded_upgrade.get(index + 2).unwrap(),
            encoded_upgrade.get(index + 3).unwrap(),
        ]);
        require(
            new_guardian_set_index > current_guardian_set_index,
            WormholeError::NewGuardianSetIndexIsInvalid,
        );
        index += 4;
        let guardian_length = encoded_upgrade.get(index).unwrap();
        index += 1;
        let mut new_guardian_set: StorageGuardianSet = StorageGuardianSet::new(
            0,
            StorageKey::<StorageVec<b256>>::new(
                ZERO_B256,
                0,
                sha256(("guardian_set_keys", new_guardian_set_index)),
            ),
        );
        let mut i: u8 = 0;
        while i < guardian_length {
            let (_, slice) = encoded_upgrade.split_at(index);
            let (key, _) = slice.split_at(20);
            let key: b256 = key.into();
            new_guardian_set.keys.push(key.rsh(96));
            index += 20;
            i += 1;
        }
        require(
            new_guardian_set
                .keys
                .len() == guardian_length
                .as_u64(),
            WormholeError::GuardianSetKeysLengthNotEqual,
        );
        require(
            encoded_upgrade
                .len() == index,
            WormholeError::InvalidGuardianSetUpgradeLength,
        );
        GuardianSetUpgrade::new(
            action,
            chain,
            module,
            new_guardian_set,
            new_guardian_set_index,
        )
    }
}

pub struct GuardianSignature {
    guardian_index: u8,
    r: b256,
    s: b256,
    v: u8,
}

impl GuardianSignature {
    pub fn new(guardian_index: u8, r: b256, s: b256, v: u8) -> Self {
        GuardianSignature {
            guardian_index,
            r,
            s,
            v,
        }
    }
    // eip-2098: Compact Signature Representation
    pub fn compact(self) -> B512 {
        let y_parity = b256::from_be_bytes([
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            0u8,
            self.v - 27u8,
        ]);
        let shifted_y_parity = y_parity.lsh(255);
        let y_parity_and_s = b256::binary_or(shifted_y_parity, self.s);
        B512::from((self.r, y_parity_and_s))
    }
}

impl GuardianSignature {
    pub fn verify(
        self,
        guardian_set_key: b256,
        hash: b256,
        index: u64,
        last_index: u64,
) {
        // Ensure that provided signature indices are ascending only
        if index > 0 {
            require(
                self.guardian_index
                    .as_u64() > last_index,
                WormholeError::SignatureIndicesNotAscending,
            );
        }
        let recovered_signer = ec_recover_evm_address(self.compact(), hash);
        require(
            recovered_signer
                .is_ok() && recovered_signer
                .unwrap()
                .bits() == guardian_set_key,
            WormholeError::SignatureInvalid,
        );
    }
}

pub struct WormholeVM {
    pub version: u8,
    pub guardian_set_index: u32,
    pub governance_action_hash: b256,
    // signatures: Vec<GuardianSignature>, // Shown here to represent data layout of VM, but not needed
    pub timestamp: u32,
    pub nonce: u32,
    pub emitter_chain_id: u16,
    pub emitter_address: b256,
    pub sequence: u64,
    pub consistency_level: u8,
    pub payload: Bytes,
}

impl WormholeVM {
    pub fn default() -> Self {
        WormholeVM {
            version: 0u8,
            guardian_set_index: 0u32,
            governance_action_hash: ZERO_B256,
            timestamp: 0u32,
            nonce: 0u32,
            emitter_chain_id: 0u16,
            emitter_address: ZERO_B256,
            sequence: 0u64,
            consistency_level: 0u8,
            payload: Bytes::new(),
        }
    }
    pub fn new(
        version: u8,
        guardian_set_index: u32,
        governance_action_hash: b256,
        timestamp_: u32,
        nonce: u32,
        emitter_chain_id: u16,
        emitter_address: b256,
        sequence: u64,
        consistency_level: u8,
        payload: Bytes,
    ) -> Self {
        WormholeVM {
            version,
            guardian_set_index,
            governance_action_hash,
            timestamp: timestamp_,
            nonce,
            emitter_chain_id,
            emitter_address,
            sequence,
            consistency_level,
            payload,
        }
    }
}

impl WormholeVM {
    #[storage(read)]
    pub fn parse_and_verify_wormhole_vm(
        current_guardian_set_index: u32,
        encoded_vm: Bytes,
        wormhole_guardian_sets: StorageKey<StorageMap<u32, StorageGuardianSet>>,
    ) -> Self {
        let mut index = 0;
        let version = encoded_vm.get(index);
        require(
            version
                .is_some() && version
                .unwrap() == 1,
            WormholeError::VMVersionIncompatible,
        );
        index += 1;
        let (_, slice) = encoded_vm.split_at(index);
        let (slice, _) = slice.split_at(4); //replace with slice()
        let guardian_set_index = u32::from_be_bytes([
            //replace with func
            slice.get(0).unwrap(),
            slice.get(1).unwrap(),
            slice.get(2).unwrap(),
            slice.get(3).unwrap(),
        ]);
        index += 4;
        let guardian_set = wormhole_guardian_sets.get(guardian_set_index).try_read();
        require(guardian_set.is_some(), WormholeError::GuardianSetNotFound);
        let guardian_set = guardian_set.unwrap();
        require(
            guardian_set
                .keys
                .len() > 0,
            WormholeError::InvalidGuardianSetKeysLength,
        );
        require(
            guardian_set_index == current_guardian_set_index && (guardian_set
                    .expiration_time == 0 || guardian_set
                    .expiration_time > timestamp()),
            WormholeError::InvalidGuardianSet,
        );
        let signers_length = encoded_vm.get(index);
        require(
            signers_length
                .is_some(),
            WormholeError::SignersLengthIrretrievable,
        );
        let signers_length = signers_length.unwrap().as_u64();
        index += 1;
        // 66 is the length of each guardian signature
        // 1 (guardianIndex) + 32 (r) + 32 (s) + 1 (v)
        let hash_index = index + (signers_length * 66);
        require(
            hash_index < encoded_vm
                .len(),
            WormholeError::InvalidSignatureLength,
        );
        let (_, slice) = encoded_vm.split_at(hash_index);
        let hash = keccak256(keccak256(slice));
        let mut last_index = 0;
        let mut i = 0;
        while i < signers_length {
            let guardian_index = encoded_vm.get(index);
            require(
                guardian_index
                    .is_some(),
                WormholeError::GuardianIndexIrretrievable,
            );
            let guardian_index = guardian_index.unwrap();
            index += 1;
            let (_, slice) = encoded_vm.split_at(index);
            let (slice, remainder) = slice.split_at(32);
            let r: b256 = slice.into();
            index += 32;
            let (slice, remainder) = remainder.split_at(32);
            let s: b256 = slice.into();
            index += 32;
            let v = remainder.get(0);
            require(v.is_some(), WormholeError::SignatureVIrretrievable);
            let v = v.unwrap() + 27;
            index += 1;
            let guardian_set_key = guardian_set.keys.get(guardian_index.as_u64());
            require(
                guardian_set_key
                    .is_some(),
                WormholeError::GuardianSetKeyIrretrievable,
            );
            GuardianSignature::new(guardian_index, r, s, v)
                .verify(guardian_set_key.unwrap().read(), hash, i, last_index);
            last_index = guardian_index.as_u64();
            i += 1;
        }
        /*
        We're using a fixed point number transformation with 1 decimal to deal with rounding.
        This quorum check is critical to assessing whether we have enough Guardian signatures to validate a VM.
        If guardian set key length is 0 and signatures length is 0, this could compromise the integrity of both VM and signature verification.
        */
        require(
            ((((guardian_set
                                .keys
                                .len() * 10) / 3) * 2) / 10 + 1) <= signers_length,
            WormholeError::NoQuorum,
        );
        //ignore VM.signatures
        let (_, slice) = encoded_vm.split_at(index);
        let (slice, _) = slice.split_at(4);
        let _timestamp = u32::from_be_bytes([
            slice.get(0).unwrap(),
            slice.get(1).unwrap(),
            slice.get(2).unwrap(),
            slice.get(3).unwrap(),
        ]);
        index += 4;
        let (_, slice) = encoded_vm.split_at(index);
        let (slice, _) = slice.split_at(4);
        let nonce = u32::from_be_bytes([
            slice.get(0).unwrap(),
            slice.get(1).unwrap(),
            slice.get(2).unwrap(),
            slice.get(3).unwrap(),
        ]);
        index += 4;
        let (_, slice) = encoded_vm.split_at(index);
        let (slice, _) = slice.split_at(2);
        let emitter_chain_id = u16::from_be_bytes([slice.get(0).unwrap(), slice.get(1).unwrap()]);
        index += 2;
        let (_, slice) = encoded_vm.split_at(index);
        let (slice, _) = slice.split_at(32);
        let emitter_address: b256 = slice.into();
        index += 32;
        let (_, slice) = encoded_vm.split_at(index);
        let (slice, _) = slice.split_at(8);
        let sequence = u64::from_be_bytes([
            slice.get(0).unwrap(),
            slice.get(1).unwrap(),
            slice.get(2).unwrap(),
            slice.get(3).unwrap(),
            slice.get(4).unwrap(),
            slice.get(5).unwrap(),
            slice.get(6).unwrap(),
            slice.get(7).unwrap(),
        ]);
        index += 8;
        let consistency_level = encoded_vm.get(index);
        require(
            consistency_level
                .is_some(),
            WormholeError::ConsistencyLevelIrretrievable,
        );
        index += 1;
        require(
            index <= encoded_vm
                .len(),
            WormholeError::InvalidPayloadLength,
        );
        let (_, payload) = encoded_vm.split_at(index);
        WormholeVM::new(
            version
                .unwrap(),
            guardian_set_index,
            hash,
            _timestamp,
            nonce,
            emitter_chain_id,
            emitter_address,
            sequence,
            consistency_level
                .unwrap(),
            payload,
        )
    }
    pub fn parse_initial_wormhole_vm(encoded_vm: Bytes) -> Self {
        let mut index = 0;
        let version = encoded_vm.get(index);
        require(
            version
                .is_some() && version
                .unwrap() == 1,
            WormholeError::VMVersionIncompatible,
        );
        index += 1;
        let (_, slice) = encoded_vm.split_at(index);
        let (slice, _) = slice.split_at(4); //replace with slice()
        let guardian_set_index = u32::from_be_bytes([
            //replace with func
            slice.get(0).unwrap(),
            slice.get(1).unwrap(),
            slice.get(2).unwrap(),
            slice.get(3).unwrap(),
        ]);
        index += 4;
        let signers_length = encoded_vm.get(index);
        require(
            signers_length
                .is_some(),
            WormholeError::SignersLengthIrretrievable,
        );
        let signers_length = signers_length.unwrap().as_u64();
        index += 1;
        // 66 is the length of each guardian signature
        // 1 (guardianIndex) + 32 (r) + 32 (s) + 1 (v)
        let hash_index = index + (signers_length * 66);
        require(
            hash_index < encoded_vm
                .len(),
            WormholeError::InvalidSignatureLength,
        );
        let (_, slice) = encoded_vm.split_at(hash_index);
        let hash = keccak256(keccak256(slice));
        // account for signatures
        index += 66 * signers_length;
        let (_, slice) = encoded_vm.split_at(index);
        let (slice, _) = slice.split_at(4);
        let timestamp_ = u32::from_be_bytes([
            slice.get(0).unwrap(),
            slice.get(1).unwrap(),
            slice.get(2).unwrap(),
            slice.get(3).unwrap(),
        ]);
        index += 4;
        let (_, slice) = encoded_vm.split_at(index);
        let (slice, _) = slice.split_at(4);
        let nonce = u32::from_be_bytes([
            slice.get(0).unwrap(),
            slice.get(1).unwrap(),
            slice.get(2).unwrap(),
            slice.get(3).unwrap(),
        ]);
        index += 4;
        let (_, slice) = encoded_vm.split_at(index);
        let (slice, _) = slice.split_at(2);
        let emitter_chain_id = u16::from_be_bytes([slice.get(0).unwrap(), slice.get(1).unwrap()]);
        index += 2;
        let (_, slice) = encoded_vm.split_at(index);
        let (slice, _) = slice.split_at(32);
        let emitter_address: b256 = slice.into();
        index += 32;
        let (_, slice) = encoded_vm.split_at(index);
        let (slice, _) = slice.split_at(8);
        let sequence = u64::from_be_bytes([
            slice.get(0).unwrap(),
            slice.get(1).unwrap(),
            slice.get(2).unwrap(),
            slice.get(3).unwrap(),
            slice.get(4).unwrap(),
            slice.get(5).unwrap(),
            slice.get(6).unwrap(),
            slice.get(7).unwrap(),
        ]);
        index += 8;
        let consistency_level = encoded_vm.get(index);
        require(
            consistency_level
                .is_some(),
            WormholeError::ConsistencyLevelIrretrievable,
        );
        index += 1;
        require(
            index <= encoded_vm
                .len(),
            WormholeError::InvalidPayloadLength,
        );
        let (_, payload) = encoded_vm.split_at(index);
        WormholeVM::new(
            version
                .unwrap(),
            guardian_set_index,
            hash,
            timestamp_,
            nonce,
            emitter_chain_id,
            emitter_address,
            sequence,
            consistency_level
                .unwrap(),
            payload,
        )
    }
}

impl WormholeVM {
    #[storage(read)]
    pub fn parse_and_verify_pyth_vm(
        current_guardian_set_index: u32,
        encoded_vm: Bytes,
        wormhole_guardian_sets: StorageKey<StorageMap<u32, StorageGuardianSet>>,
        is_valid_data_source: StorageKey<StorageMap<DataSource, bool>>,
    ) -> Self {
        let vm = WormholeVM::parse_and_verify_wormhole_vm(
            current_guardian_set_index,
            encoded_vm,
            wormhole_guardian_sets,
        );
        require(
            DataSource::new(vm.emitter_chain_id, vm.emitter_address)
                .is_valid_data_source(is_valid_data_source),
            WormholeError::InvalidUpdateDataSource,
        );
        vm
    }
}
