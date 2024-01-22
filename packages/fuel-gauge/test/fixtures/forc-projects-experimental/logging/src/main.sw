contract;

use std::logging::log;

abi LoggingContract {
    fn log_u8(a: u8) -> u8;
    fn log_u16(a: u16) -> u16;
    fn log_u32(a: u32) -> u32;
    fn log_u64(a: u64) -> u64;
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

    fn log_u64(a: u64) -> u64 {
        log(a);
        a
    }
}
