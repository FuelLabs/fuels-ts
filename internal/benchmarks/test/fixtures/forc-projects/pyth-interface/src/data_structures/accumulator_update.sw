library;

use ::errors::PythError;
use ::data_structures::{data_source::*, price::*, wormhole_light::{StorageGuardianSet, WormholeVM}};
use std::{bytes::Bytes, hash::Hash};

pub struct AccumulatorUpdate {
    data: Bytes,
}
const MINIMUM_ALLOWED_MINOR_VERSION = 0;
const MAJOR_VERSION = 1;
impl AccumulatorUpdate {
    pub fn new(data: Bytes) -> Self {
        Self { data }
    }
    pub fn total_updates(self, ref mut offset: u64) -> u64 {
        let proof_size = u16::from_be_bytes([self.data.get(offset).unwrap(), self.data.get(offset + 1).unwrap()]).as_u64();
        offset += proof_size + 2;
        self.data.get(offset).unwrap().as_u64()
    }
    pub fn verify(self) -> u64 {
        // skip magic as already checked when this is called
        let major_version = self.data.get(4);
        require(
            major_version
                .is_some() && major_version
                .unwrap() == MAJOR_VERSION,
            PythError::InvalidMajorVersion,
        );
        let minor_version = self.data.get(5);
        require(
            minor_version
                .is_some() && minor_version
                .unwrap() >= MINIMUM_ALLOWED_MINOR_VERSION,
            PythError::InvalidMinorVersion,
        );
        let trailing_header_size = self.data.get(6);
        require(trailing_header_size.is_some(), PythError::InvalidHeaderSize);
        // skip trailing headers and update type
        let offset = 8 + trailing_header_size.unwrap().as_u64();
        require(
            self.data
                .len() >= offset,
            PythError::InvalidUpdateDataLength,
        );
        offset
    }
}
impl AccumulatorUpdate {
    #[storage(read)]
    pub fn verify_and_parse(
        self,
        current_guardian_set_index: u32,
        wormhole_guardian_sets: StorageKey<StorageMap<u32, StorageGuardianSet>>,
        is_valid_data_source: StorageKey<StorageMap<DataSource, bool>>,
) -> (u64, Bytes, u64, Bytes) {
        let encoded_offset = self.verify();
        let (_, slice) = self.data.split_at(encoded_offset);
        let (encoded_slice, _) = slice.split_at(self.data.len() - encoded_offset);
        let mut offset = 0;
        let wormhole_proof_size = u16::from_be_bytes([encoded_slice.get(offset).unwrap(), encoded_slice.get(offset + 1).unwrap()]).as_u64();
        offset += 2;
        let (_, slice) = encoded_slice.split_at(offset);
        let (encoded_vm, _) = slice.split_at(wormhole_proof_size);
        let vm = WormholeVM::parse_and_verify_pyth_vm(
            current_guardian_set_index,
            encoded_vm,
            wormhole_guardian_sets,
            is_valid_data_source,
        );
        offset += wormhole_proof_size;
        let encoded_payload = vm.payload;
        /*
        Payload offset:
        skip magic (4 bytes) as already checked when this is called
        skip update_type as (1 byte) it can only be WormholeMerkle
        skip slot (8 bytes) as unused
        skip ring_size (4 bytes) as unused
        */
        let mut payload_offset = 17;
        let (_, slice) = encoded_payload.split_at(payload_offset);
        let (digest, _) = slice.split_at(20);
        payload_offset += 20;
        require(
            payload_offset <= encoded_payload
                .len(),
            PythError::InvalidPayloadLength,
        );
        let number_of_updates = encoded_slice.get(offset);
        require(
            number_of_updates
                .is_some(),
            PythError::NumberOfUpdatesIrretrievable,
        );
        offset += 1;
        (offset, digest, number_of_updates.unwrap().as_u64(), encoded_slice)
    }
}
impl AccumulatorUpdate {
    #[storage(read, write)]
    pub fn update_price_feeds(
        self,
        current_guardian_set_index: u32,
        wormhole_guardian_sets: StorageKey<StorageMap<u32, StorageGuardianSet>>,
        latest_price_feed: StorageKey<StorageMap<PriceFeedId, PriceFeed>>,
        is_valid_data_source: StorageKey<StorageMap<DataSource, bool>>,
) -> (u64, Vec<PriceFeedId>) {
        let (mut offset, digest, number_of_updates, encoded_data) = self.verify_and_parse(
            current_guardian_set_index,
            wormhole_guardian_sets,
            is_valid_data_source,
        );

        let mut updated_ids = Vec::new();
        let mut i = 0;
        while i < number_of_updates {
            let (new_offset, price_feed) = PriceFeed::extract_from_merkle_proof(digest, encoded_data, offset);
            offset = new_offset;
            let latest_publish_time = match latest_price_feed.get(price_feed.id).try_read() {
                Some(price_feed) => price_feed.price.publish_time,
                None => 0,
            };
            if price_feed.price.publish_time > latest_publish_time {
                latest_price_feed.insert(price_feed.id, price_feed);
                updated_ids.push(price_feed.id);
            }
            i += 1;
        }
        require(
            offset == encoded_data
                .len(),
            PythError::InvalidUpdateDataLength,
        );
        (number_of_updates, updated_ids)
    }
}
