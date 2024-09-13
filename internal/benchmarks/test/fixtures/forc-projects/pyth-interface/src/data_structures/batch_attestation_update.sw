library;

use ::errors::PythError;
use ::data_structures::{data_source::*, price::*, wormhole_light::{StorageGuardianSet, WormholeVM}};
use std::{bytes::Bytes, hash::Hash};

const BATCH_MAGIC: u32 = 0x50325748;

pub struct BatchAttestationUpdate {
    pub data: Bytes,
}
impl BatchAttestationUpdate {
    pub fn new(data: Bytes) -> Self {
        Self { data }
    }
    #[storage(read, write)]
    pub fn update_price_feeds(
        self,
        current_guardian_set_index: u32,
        wormhole_guardian_sets: StorageKey<StorageMap<u32, StorageGuardianSet>>,
        latest_price_feed: StorageKey<StorageMap<PriceFeedId, PriceFeed>>,
        is_valid_data_source: StorageKey<StorageMap<DataSource, bool>>,
) -> Vec<PriceFeedId> {
        let vm = WormholeVM::parse_and_verify_pyth_vm(
            current_guardian_set_index,
            self.data,
            wormhole_guardian_sets,
            is_valid_data_source,
        );
        let (mut attestation_index, number_of_attestations, attestation_size) = parse_and_verify_batch_attestation_header(vm.payload);
        let mut updated_ids = Vec::new();
        let mut i: u16 = 0;
        while i < number_of_attestations {
            let price_feed = PriceFeed::parse_attestation(attestation_size, vm.payload, attestation_index);
            // Respect specified attestation size for forward-compatibility
            attestation_index += attestation_size.as_u64();
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
        updated_ids
    }
}
pub fn parse_and_verify_batch_attestation_header(encoded_payload: Bytes) -> (u64, u16, u16) {
    let mut index = 0;
    //Check header
    let magic = u32::from_be_bytes([
        encoded_payload.get(index).unwrap(),
        encoded_payload.get(index + 1).unwrap(),
        encoded_payload.get(index + 2).unwrap(),
        encoded_payload.get(index + 3).unwrap(),
    ]);
    require(magic == BATCH_MAGIC, PythError::InvalidMagic);
    index += 4;
    let major_version = u16::from_be_bytes([encoded_payload.get(index).unwrap(), encoded_payload.get(index + 1).unwrap()]);
    require(major_version == 3, PythError::InvalidMajorVersion);
    // addtionally skip minor_version(2 bytes) as unused
    index += 4;
    let header_size = u16::from_be_bytes([encoded_payload.get(index).unwrap(), encoded_payload.get(index + 1).unwrap()]);
    index += 2;
    // From solidity impl:
    // NOTE(2022-04-19): Currently, only payloadId comes after
    // hdrSize. Future extra header fields must be read using a
    // separate offset to respect hdrSize, i.e.:
    // uint hdrIndex = 0;
    // bpa.header.payloadId = UnsafeBytesLib.toUint8(encoded, index + hdrIndex);
    // hdrIndex += 1;
    // bpa.header.someNewField = UnsafeBytesLib.toUint32(encoded, index + hdrIndex);
    // hdrIndex += 4;
    // Skip remaining unknown header bytes
    // index += bpa.header.hdrSize;
    let payload_id = encoded_payload.get(index).unwrap();
    // Payload ID of 2 required for batch header
    require(payload_id == 2, PythError::InvalidPayloadId);
    // Skip remaining unknown header bytes
    index += header_size.as_u64();
    let number_of_attestations = u16::from_be_bytes([encoded_payload.get(index).unwrap(), encoded_payload.get(index + 1).unwrap()]);
    index += 2;
    let attestation_size = u16::from_be_bytes([encoded_payload.get(index).unwrap(), encoded_payload.get(index + 1).unwrap()]);
    index += 2;
    require(
        encoded_payload
            .len() == index + (attestation_size * number_of_attestations)
            .as_u64(),
        PythError::InvalidPayloadLength,
    );
    return (index, number_of_attestations, attestation_size);
}
