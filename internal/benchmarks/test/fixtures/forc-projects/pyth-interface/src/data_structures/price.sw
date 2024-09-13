library;

use std::{block::timestamp, bytes::Bytes};

use ::errors::PythError;
use ::utils::absolute_of_exponent;
use ::data_structures::wormhole_light::WormholeVM;
use ::pyth_merkle_proof::validate_proof;
const TAI64_DIFFERENCE = 4611686018427387904;
// A price with a degree of uncertainty, represented as a price +- a confidence interval.
//
// The confidence interval roughly corresponds to the standard error of a normal distribution.
// Both the price and confidence are stored in a fixed-point numeric representation,
// `x * (10^expo)`, where `expo` is the exponent.
//
// Please refer to the documentation at https://docs.pyth.network/documentation/pythnet-price-feeds/best-practices for how
// to how this price safely.
pub struct Price {
    // Confidence interval around the price
    pub confidence: u64,
    // Price exponent
    // This value represents the absolute value of an i32 in the range -255 to 0. Values other than 0, should be considered negative:
    // exponent of 5 means the Pyth Price exponent was -5
    pub exponent: u32,
    // Price
    pub price: u64,
    // The TAI64 timestamp describing when the price was published
    pub publish_time: u64,
}
impl Price {
    pub fn new(
        confidence: u64,
        exponent: u32,
        price: u64,
        publish_time: u64,
    ) -> Self {
        Self {
            confidence,
            exponent,
            price,
            publish_time,
        }
    }
}
// The `PriceFeedId` type is an alias for `b256` that represents the id for a specific Pyth price feed.
pub type PriceFeedId = b256;
// PriceFeed represents a current aggregate price from Pyth publisher feeds.
pub struct PriceFeed {
    // Latest available exponentially-weighted moving average price
    pub ema_price: Price,
    // The price ID.
    pub id: PriceFeedId,
    // Latest available price
    pub price: Price,
}
impl PriceFeedId {
    pub fn is_target(self, target_price_feed_ids: Vec<PriceFeedId>) -> bool {
        let mut i = 0;
        while i < target_price_feed_ids.len() {
            if target_price_feed_ids.get(i).unwrap() == self {
                return true;
            }
            i += 1;
        }
        false
    }
    pub fn is_contained_within(self, output_price_feeds: Vec<PriceFeed>) -> bool {
        let mut i = 0;
        while i < output_price_feeds.len() {
            if output_price_feeds.get(i).unwrap().id == self {
                return true;
            }
            i += 1;
        }
        false
    }
}
impl PriceFeed {
    pub fn new(ema_price: Price, id: PriceFeedId, price: Price) -> Self {
        Self {
            ema_price,
            id,
            price,
        }
    }
}
impl PriceFeed {
    pub fn parse_message(encoded_price_feed: Bytes) -> Self {
        let mut offset = 1u64;
        let (_, slice) = encoded_price_feed.split_at(offset);
        let (price_feed_id, _) = slice.split_at(32);
        let price_feed_id: PriceFeedId = price_feed_id.into();
        offset += 32;
        let price = u64::from_be_bytes([
            encoded_price_feed.get(offset).unwrap(),
            encoded_price_feed.get(offset + 1).unwrap(),
            encoded_price_feed.get(offset + 2).unwrap(),
            encoded_price_feed.get(offset + 3).unwrap(),
            encoded_price_feed.get(offset + 4).unwrap(),
            encoded_price_feed.get(offset + 5).unwrap(),
            encoded_price_feed.get(offset + 6).unwrap(),
            encoded_price_feed.get(offset + 7).unwrap(),
        ]);
        offset += 8;
        let confidence = u64::from_be_bytes([
            encoded_price_feed.get(offset).unwrap(),
            encoded_price_feed.get(offset + 1).unwrap(),
            encoded_price_feed.get(offset + 2).unwrap(),
            encoded_price_feed.get(offset + 3).unwrap(),
            encoded_price_feed.get(offset + 4).unwrap(),
            encoded_price_feed.get(offset + 5).unwrap(),
            encoded_price_feed.get(offset + 6).unwrap(),
            encoded_price_feed.get(offset + 7).unwrap(),
        ]);
        offset += 8;
        // exponent is an i32, expected to be in the range -255 to 0
        let exponent = u32::from_be_bytes([
            encoded_price_feed.get(offset).unwrap(),
            encoded_price_feed.get(offset + 1).unwrap(),
            encoded_price_feed.get(offset + 2).unwrap(),
            encoded_price_feed.get(offset + 3).unwrap(),
        ]);
        let exponent = absolute_of_exponent(exponent);
        require(exponent < 256u32, PythError::InvalidExponent);
        offset += 4;
        let mut publish_time = u64::from_be_bytes([
            encoded_price_feed.get(offset).unwrap(),
            encoded_price_feed.get(offset + 1).unwrap(),
            encoded_price_feed.get(offset + 2).unwrap(),
            encoded_price_feed.get(offset + 3).unwrap(),
            encoded_price_feed.get(offset + 4).unwrap(),
            encoded_price_feed.get(offset + 5).unwrap(),
            encoded_price_feed.get(offset + 6).unwrap(),
            encoded_price_feed.get(offset + 7).unwrap(),
        ]);
        // skip unused previous_publish_times (8 bytes)
        offset += 16;
        let ema_price = u64::from_be_bytes([
            encoded_price_feed.get(offset).unwrap(),
            encoded_price_feed.get(offset + 1).unwrap(),
            encoded_price_feed.get(offset + 2).unwrap(),
            encoded_price_feed.get(offset + 3).unwrap(),
            encoded_price_feed.get(offset + 4).unwrap(),
            encoded_price_feed.get(offset + 5).unwrap(),
            encoded_price_feed.get(offset + 6).unwrap(),
            encoded_price_feed.get(offset + 7).unwrap(),
        ]);
        offset += 8;
        let ema_confidence = u64::from_be_bytes([
            encoded_price_feed.get(offset).unwrap(),
            encoded_price_feed.get(offset + 1).unwrap(),
            encoded_price_feed.get(offset + 2).unwrap(),
            encoded_price_feed.get(offset + 3).unwrap(),
            encoded_price_feed.get(offset + 4).unwrap(),
            encoded_price_feed.get(offset + 5).unwrap(),
            encoded_price_feed.get(offset + 6).unwrap(),
            encoded_price_feed.get(offset + 7).unwrap(),
        ]);
        offset += 8;
        require(
            offset <= encoded_price_feed
                .len(),
            PythError::InvalidPriceFeedDataLength,
        );
        //convert publish_time from UNIX to TAI64
        publish_time += TAI64_DIFFERENCE;
        require(
            publish_time <= timestamp(),
            PythError::FuturePriceNotAllowed,
        );
        PriceFeed::new(
            Price::new(ema_confidence, exponent, ema_price, publish_time),
            price_feed_id,
            Price::new(confidence, exponent, price, publish_time),
        )
    }
    pub fn parse_attestation(attestation_size: u16, encoded_payload: Bytes, index: u64) -> Self {
        // Skip product id (32 bytes) as unused
        let mut attestation_index = index + 32;
        let (_, slice) = encoded_payload.split_at(attestation_index);
        let (price_feed_id, _) = slice.split_at(32);
        let price_feed_id: PriceFeedId = price_feed_id.into();
        attestation_index += 32;
        let mut price = u64::from_be_bytes([
            encoded_payload.get(attestation_index).unwrap(),
            encoded_payload.get(attestation_index + 1).unwrap(),
            encoded_payload.get(attestation_index + 2).unwrap(),
            encoded_payload.get(attestation_index + 3).unwrap(),
            encoded_payload.get(attestation_index + 4).unwrap(),
            encoded_payload.get(attestation_index + 5).unwrap(),
            encoded_payload.get(attestation_index + 6).unwrap(),
            encoded_payload.get(attestation_index + 7).unwrap(),
        ]);
        attestation_index += 8;
        let mut confidence = u64::from_be_bytes([
            encoded_payload.get(attestation_index).unwrap(),
            encoded_payload.get(attestation_index + 1).unwrap(),
            encoded_payload.get(attestation_index + 2).unwrap(),
            encoded_payload.get(attestation_index + 3).unwrap(),
            encoded_payload.get(attestation_index + 4).unwrap(),
            encoded_payload.get(attestation_index + 5).unwrap(),
            encoded_payload.get(attestation_index + 6).unwrap(),
            encoded_payload.get(attestation_index + 7).unwrap(),
        ]);
        attestation_index += 8;
        // exponent is an i32, expected to be in the range -255 to 0
        let exponent = u32::from_be_bytes([
            encoded_payload.get(attestation_index).unwrap(),
            encoded_payload.get(attestation_index + 1).unwrap(),
            encoded_payload.get(attestation_index + 2).unwrap(),
            encoded_payload.get(attestation_index + 3).unwrap(),
        ]);
        let exponent = absolute_of_exponent(exponent);
        require(exponent < 256u32, PythError::InvalidExponent);
        attestation_index += 4;
        let ema_price = u64::from_be_bytes([
            encoded_payload.get(attestation_index).unwrap(),
            encoded_payload.get(attestation_index + 1).unwrap(),
            encoded_payload.get(attestation_index + 2).unwrap(),
            encoded_payload.get(attestation_index + 3).unwrap(),
            encoded_payload.get(attestation_index + 4).unwrap(),
            encoded_payload.get(attestation_index + 5).unwrap(),
            encoded_payload.get(attestation_index + 6).unwrap(),
            encoded_payload.get(attestation_index + 7).unwrap(),
        ]);
        attestation_index += 8;
        let ema_confidence = u64::from_be_bytes([
            encoded_payload.get(attestation_index).unwrap(),
            encoded_payload.get(attestation_index + 1).unwrap(),
            encoded_payload.get(attestation_index + 2).unwrap(),
            encoded_payload.get(attestation_index + 3).unwrap(),
            encoded_payload.get(attestation_index + 4).unwrap(),
            encoded_payload.get(attestation_index + 5).unwrap(),
            encoded_payload.get(attestation_index + 6).unwrap(),
            encoded_payload.get(attestation_index + 7).unwrap(),
        ]);
        attestation_index += 8;
        // Status is an enum (encoded as u8) with the following values:
        // 0 = UNKNOWN: The price feed is not currently updating for an unknown reason.
        // 1 = TRADING: The price feed is updating as expected.
        // 2 = HALTED: The price feed is not currently updating because trading in the product has been halted.
        // 3 = AUCTION: The price feed is not currently updating because an auction is setting the price.
        let status = encoded_payload.get(attestation_index).unwrap();
        // Additionally skip number_of publishers (8 bytes) and attestation_time (8 bytes); as unused
        attestation_index += 17;
        let mut publish_time = u64::from_be_bytes([
            encoded_payload.get(attestation_index).unwrap(),
            encoded_payload.get(attestation_index + 1).unwrap(),
            encoded_payload.get(attestation_index + 2).unwrap(),
            encoded_payload.get(attestation_index + 3).unwrap(),
            encoded_payload.get(attestation_index + 4).unwrap(),
            encoded_payload.get(attestation_index + 5).unwrap(),
            encoded_payload.get(attestation_index + 6).unwrap(),
            encoded_payload.get(attestation_index + 7).unwrap(),
        ]);
        attestation_index += 8;
        if status == 1u8 {
            attestation_index += 24;
        } else {
            // If status is not trading then the latest available price is
            // the previous price that is parsed here.

            // previous publish time
            publish_time = u64::from_be_bytes([
                encoded_payload.get(attestation_index).unwrap(),
                encoded_payload.get(attestation_index + 1).unwrap(),
                encoded_payload.get(attestation_index + 2).unwrap(),
                encoded_payload.get(attestation_index + 3).unwrap(),
                encoded_payload.get(attestation_index + 4).unwrap(),
                encoded_payload.get(attestation_index + 5).unwrap(),
                encoded_payload.get(attestation_index + 6).unwrap(),
                encoded_payload.get(attestation_index + 7).unwrap(),
            ]);
            attestation_index += 8;
            // previous price
            price = u64::from_be_bytes([
                encoded_payload.get(attestation_index).unwrap(),
                encoded_payload.get(attestation_index + 1).unwrap(),
                encoded_payload.get(attestation_index + 2).unwrap(),
                encoded_payload.get(attestation_index + 3).unwrap(),
                encoded_payload.get(attestation_index + 4).unwrap(),
                encoded_payload.get(attestation_index + 5).unwrap(),
                encoded_payload.get(attestation_index + 6).unwrap(),
                encoded_payload.get(attestation_index + 7).unwrap(),
            ]);
            attestation_index += 8;
            // previous confidence
            confidence = u64::from_be_bytes([
                encoded_payload.get(attestation_index).unwrap(),
                encoded_payload.get(attestation_index + 1).unwrap(),
                encoded_payload.get(attestation_index + 2).unwrap(),
                encoded_payload.get(attestation_index + 3).unwrap(),
                encoded_payload.get(attestation_index + 4).unwrap(),
                encoded_payload.get(attestation_index + 5).unwrap(),
                encoded_payload.get(attestation_index + 6).unwrap(),
                encoded_payload.get(attestation_index + 7).unwrap(),
            ]);
            attestation_index += 8;
        }
        require(
            (attestation_index - index) <= attestation_size
                .as_u64(),
            PythError::InvalidAttestationSize,
        );
        //convert publish_time from UNIX to TAI64
        publish_time += TAI64_DIFFERENCE;
        PriceFeed::new(
            Price::new(ema_confidence, exponent, ema_price, publish_time),
            price_feed_id,
            Price::new(confidence, exponent, price, publish_time),
        )
    }
}
impl PriceFeed {
    pub fn extract_from_merkle_proof(digest: Bytes, encoded_proof: Bytes, offset: u64) -> (u64, self) {
        // In order to avoid `ref mut` param related MemoryWriteOverlap error
        let mut current_offset = offset;
        let message_size = u16::from_be_bytes([
            encoded_proof.get(current_offset).unwrap(),
            encoded_proof.get(current_offset + 1).unwrap(),
        ]).as_u64();
        current_offset += 2;
        let (_, slice) = encoded_proof.split_at(current_offset);
        let (encoded_message, _) = slice.split_at(message_size);
        current_offset += message_size;
        let end_offset = validate_proof(
            encoded_proof,
            current_offset,
            digest,
            encoded_message
                .clone(),
        );
        // Message type of 0 is a Price Feed
        require(
            encoded_message
                .get(0)
                .unwrap() == 0,
            PythError::IncorrectMessageType,
        );
        let price_feed = PriceFeed::parse_message(encoded_message);
        (end_offset, price_feed)
    }
}
