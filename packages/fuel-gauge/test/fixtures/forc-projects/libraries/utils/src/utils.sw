library;

use interfaces::data_structures::{Asset, PoolId};
use interfaces::errors::InputError;
use std::{bytes::Bytes, hash::{Hash, sha256}, string::String};

pub fn is_stable(pool_id: PoolId) -> bool {
    pool_id.2
}

/// Validates that the provided pool id is correct, i.e.:
///  - has two distinct assets
///  - assets are ordered
pub fn validate_pool_id(pool_id: PoolId) {
    require(pool_id.0 != pool_id.1, InputError::IdenticalAssets);
    let pool_id_0_b256: b256 = pool_id.0.into();
    let pool_id_1_b256: b256 = pool_id.1.into();
    require(
        pool_id_0_b256 < pool_id_1_b256,
        InputError::UnsortedAssetPair,
    );
}

/// Builds and returns an LP sub id and asset id for the provided pool id
pub fn get_lp_asset(pool_id: PoolId) -> (SubId, AssetId) {
    validate_pool_id(pool_id);
    let lp_sub_id = sha256(pool_id);
    (lp_sub_id, AssetId::new(ContractId::this(), lp_sub_id))
}

pub fn build_lp_name(symbol_0: String, symbol_1: String) -> String {
    let mut result = Bytes::new();
    result.append(symbol_0.as_bytes());
    result.append(String::from_ascii_str("-").as_bytes());
    result.append(symbol_1.as_bytes());
    result.append(String::from_ascii_str(" LP").as_bytes());
    String::from_ascii(result)
}

#[test]
fn test_validate_pool_id() {
    validate_pool_id((
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000000),
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000001),
        true,
    ));
    validate_pool_id((
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000000),
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000001),
        false,
    ));
    validate_pool_id((
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000000),
        AssetId::from(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF),
        true,
    ));
    validate_pool_id((
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000000),
        AssetId::from(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF),
        false,
    ));
}

#[test]
fn test_is_stable() {
    assert(is_stable((
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000000),
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000001),
        true,
    )));
    assert(!is_stable((
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000000),
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000001),
        false,
    )));
}

#[test(should_revert)]
fn test_validate_pool_id_for_identical_assets() {
    validate_pool_id((
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000000),
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000000),
        true,
    ));
}

#[test(should_revert)]
fn test_validate_pool_id_for_unsorted_assets() {
    validate_pool_id((
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000001),
        AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000000),
        true,
    ));
}

#[test]
fn test_build_lp_name() {
    assert_eq(
        build_lp_name(String::from_ascii_str("A"), String::from_ascii_str("B")),
        String::from_ascii_str("A-B LP"),
    );
    assert_eq(
        build_lp_name(String::from_ascii_str(""), String::from_ascii_str("B")),
        String::from_ascii_str("-B LP"),
    );
    assert_eq(
        build_lp_name(String::from_ascii_str("A"), String::from_ascii_str("")),
        String::from_ascii_str("A- LP"),
    );
    assert_eq(
        build_lp_name(String::from_ascii_str(""), String::from_ascii_str("")),
        String::from_ascii_str("- LP"),
    );
    assert_eq(
        build_lp_name(
            String::from_ascii_str("Token A"),
            String::from_ascii_str("Token B"),
        ),
        String::from_ascii_str("Token A-Token B LP"),
    );
    assert_eq(
        build_lp_name(
            String::from_ascii_str("UNKNOWN"),
            String::from_ascii_str("UNKNOWN"),
        ),
        String::from_ascii_str("UNKNOWN-UNKNOWN LP"),
    );
}
