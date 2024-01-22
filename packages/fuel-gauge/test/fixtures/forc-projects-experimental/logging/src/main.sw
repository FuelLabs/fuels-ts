contract;

use std::logging::log;
use std::b512::B512;

abi LoggingContract {
    fn log_u8(a: u8) -> u8;
    fn log_u16(a: u16) -> u16;
    fn log_u32(a: u32) -> u32;
    fn log_u8_u16_u32(a: u8, b: u16, c: u32) -> (u8, u16, u32);
    fn log_boolean(a: bool) -> bool;
    fn log_boolean_boolean(a: bool, b: bool) -> (bool, bool);
    fn log_number_boolean(a: u32, b: bool) -> (u32, bool);
    fn log_b256(a: b256) -> b256;
    fn log_b512(a: B512) -> B512;
    fn log_b256_b512(a: b256, b: B512) -> (b256, B512);
}

impl LoggingContract for Contract {
    fn log_u8(a: u8) -> u8 {
        log(a);
        a
    }

    fn log_u16(a: u16) -> u16 {
        log(a);
        a
    }

    fn log_u32(a: u32) -> u32 {
        log(a);
        a
    }

    fn log_u8_u16_u32(a: u8, b: u16, c: u32) -> (u8, u16, u32) {
        log(a);
        log(b);
        log(c);
        (a, b, c)
    }

    fn log_boolean(a: bool) -> bool {
        log(a);
        a
    }

    fn log_boolean_boolean(a: bool, b: bool) -> (bool, bool) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_number_boolean(a: u32, b: bool) -> (u32, bool) {
        log(a);
        log(b);
        (a, b)
    }

    fn log_b256(a: b256) -> b256 {
        log(a);
        a
    }

    fn log_b512(a: B512) -> B512 {
        log(a);
        a
    }

    fn log_b256_b512(a: b256, b: B512) -> (b256, B512) {
        log(a);
        log(b);
        (a, b)
    }
}
