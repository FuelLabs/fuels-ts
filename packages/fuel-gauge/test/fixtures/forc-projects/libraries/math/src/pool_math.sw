library;

use std::math::{Power, Root};
use interfaces::errors::AmmError;

const ONE_E_18: u256 = 1_000_000_000_000_000_000;
const BASIS_POINTS_DENOMINATOR: u256 = 10_000;

pub fn proportional_value(numerator_1: u64, numerator_2: u64, denominator: u64) -> u64 {
    u64::try_from(numerator_1.as_u256() * numerator_2.as_u256() / denominator.as_u256()).unwrap()
}

pub fn initial_liquidity(deposit_0: u64, deposit_1: u64) -> u64 {
    let product = deposit_0.as_u256() * deposit_1.as_u256();
    u64::try_from(product.sqrt()).unwrap()
}

pub fn calculate_fee(amount: u64, fee: u64) -> u64 {
    let nominator = amount.as_u256() * fee.as_u256();
    let fee = u64::try_from(nominator / BASIS_POINTS_DENOMINATOR).unwrap();
    if nominator % BASIS_POINTS_DENOMINATOR != 0 {
        fee + 1
    } else {
        fee
    }
}

pub fn min(a: u64, b: u64) -> u64 {
    if a < b { a } else { b }
}

fn pow_decimals(decimals: u8) -> u256 {
    10.as_u256().pow(decimals.into())
}

fn k(
    is_stable: bool,
    x: u64,
    y: u64,
    decimals_x: u8,
    decimals_y: u8,
) -> u256 {
    if (is_stable) {
        let _x: u256 = x.as_u256() * ONE_E_18 / pow_decimals(decimals_x);
        let _y: u256 = y.as_u256() * ONE_E_18 / pow_decimals(decimals_y);
        let _a: u256 = (_x * _y) / ONE_E_18;
        let _b: u256 = ((_x * _x) / ONE_E_18 + (_y * _y) / ONE_E_18);
        return _a * _b / ONE_E_18; // x3y+y3x >= k
    } else {
        return x.as_u256() * y.as_u256(); // xy >= k
    }
}

/// Validates the curve invariant, either x3y+y3x for stable pools, or x*y for volatile pools
pub fn validate_curve(
    is_stable: bool,
    balance_0: u64,
    balance_1: u64,
    reserve_0: u64,
    reserve_1: u64,
    decimals_0: u8,
    decimals_1: u8,
) {
    let reserves_k: u256 = k(is_stable, reserve_0, reserve_1, decimals_0, decimals_1);
    let balances_k: u256 = k(is_stable, balance_0, balance_1, decimals_0, decimals_1);
    require(
        balances_k >= reserves_k,
        AmmError::CurveInvariantViolation((balances_k, reserves_k)),
    );
}

/// The maximum protocol fee that might be set is 40% of the corresponding LP fee
pub fn get_max_protocol_fee(lp_fee: u64) -> u64 {
    lp_fee * 4 / 10
}

// Tests
#[test]
fn test_proportional_value() {
    assert_eq(proportional_value(2, 3, 6), 1);
    assert_eq(
        proportional_value(u64::max(), u64::max(), u64::max()),
        u64::max(),
    );
    assert_eq(proportional_value(0, 100, 5), 0);
    assert_eq(proportional_value(100, 0, 5), 0);
}

#[test(should_revert)]
fn test_revert_proportional_value_on_zero_division() {
    let _ = proportional_value(2, 3, 0);
}

#[test(should_revert)]
fn test_revert_proportional_value_on_u64_overflow() {
    let _ = proportional_value(u64::max(), u64::max(), 1);
}

#[test]
fn test_initial_liquidity() {
    assert_eq(initial_liquidity(1, 1), 1);
    assert_eq(
        initial_liquidity(u64::try_from(ONE_E_18).unwrap(), 1_000),
        31_622_776_601,
    );
    assert_eq(initial_liquidity(u64::max(), u64::max()), u64::max());
}

#[test]
fn test_calculate_fee() {
    assert_eq(calculate_fee(10, 1), 1);
    assert_eq(calculate_fee(10000, 1), 1);
    assert_eq(calculate_fee(20000, 1), 2);
    assert_eq(calculate_fee(20000, 10), 20);
    assert_eq(calculate_fee(20001, 10), 21);
    assert_eq(calculate_fee(100, 10000), 100);
    assert_eq(calculate_fee(u64::max(), 10000), u64::max());
}

#[test(should_revert)]
fn test_revert_calculate_fee_on_u64_overflow() {
    let _ = calculate_fee(u64::max(), u64::max());
}

#[test]
fn test_min() {
    assert_eq(min(1, 2), 1);
    assert_eq(min(1, 1), 1);
    assert_eq(min(u64::max(), u64::max()), u64::max());
    assert_eq(min(u64::max(), 0), 0);
}

#[test]
fn test_pow_decimals() {
    assert_eq(pow_decimals(0), 1);
    assert_eq(pow_decimals(1), 10);
    assert_eq(pow_decimals(2), 100);
    assert_eq(pow_decimals(3), 1000);
    assert_eq(pow_decimals(4), 10000);
    assert_eq(pow_decimals(5), 100000);
    assert_eq(pow_decimals(6), 1000000);
    assert_eq(pow_decimals(7), 10000000);
    assert_eq(pow_decimals(8), 100000000);
    assert_eq(pow_decimals(9), 1000000000);
    assert_eq(pow_decimals(18), ONE_E_18);
    assert_eq(pow_decimals(72), ONE_E_18 * ONE_E_18 * ONE_E_18 * ONE_E_18);
}

#[test]
fn test_k_volatile() {
    // xy
    assert_eq(k(false, 1, 1, 0, 0), 1);
    assert_eq(k(false, 1_000_000, 1_000, 0, 0), 1_000_000_000);
    assert_eq(k(false, 1_000, 1_000_000, 0, 0), 1_000_000_000);
    assert_eq(
        k(false, u64::max(), u64::max(), 0, 0),
        u64::max()
            .as_u256() * u64::max()
            .as_u256(),
    );

    let mut random_pairs: Vec<(u64, u64)> = Vec::new();
    random_pairs.push((13123, 4253213));
    random_pairs.push((123242387, 1231998653));
    random_pairs.push((898989432, 964834235));
    for (random_1, random_2)in random_pairs.iter() {
        // test that (k(x, y) == k(y, x))
        assert_eq(
            k(false, random_1, random_2, 0, 0),
            k(false, random_2, random_1, 0, 0),
        );
    }
}

#[test]
fn test_k_stable() {
    // (x3y+y3x)10^18
    assert_eq(k(true, 1, 1, 0, 0), ONE_E_18 * 2);
    assert_eq(k(true, 2, 2, 0, 0), ONE_E_18 * 32);

    let mut random_pairs: Vec<(u64, u64)> = Vec::new();
    random_pairs.push((13123, 4253213));
    random_pairs.push((123242387, 1231998653));
    random_pairs.push((898989432, 964834235));
    for (random_1, random_2)in random_pairs.iter() {
        // test that (k(x, y) == k(y, x))
        assert_eq(
            k(true, random_1, random_2, 0, 0),
            k(true, random_2, random_1, 0, 0),
        );
    }

    // k(0.3, 0.5) = 0,051
    assert_eq(k(true, 300000, 500000, 6, 6), ONE_E_18 * 51 / 1000);
    assert_eq(k(true, 3, 500000, 1, 6), ONE_E_18 * 51 / 1000);
    assert_eq(k(true, 300000, 5, 6, 1), ONE_E_18 * 51 / 1000);
    assert_eq(k(true, 300000000, 500, 9, 3), ONE_E_18 * 51 / 1000);
}

#[test(should_revert)]
fn test_k_stable_reverts_on_overflow() {
    let _ = k(true, u64::max(), u64::max(), 0, 0);
}

#[test]
fn test_get_max_protocol_fee() {
    assert_eq(get_max_protocol_fee(1), 0);
    assert_eq(get_max_protocol_fee(2), 0);
    assert_eq(get_max_protocol_fee(3), 1);
    assert_eq(get_max_protocol_fee(10), 4);
    assert_eq(get_max_protocol_fee(100), 40);
    assert_eq(get_max_protocol_fee(1000), 400);
    assert_eq(get_max_protocol_fee(10000), 4000);
    assert_eq(get_max_protocol_fee(333), 133);
    assert_eq(get_max_protocol_fee(30), 12);
    assert_eq(get_max_protocol_fee(5), 2);
}
