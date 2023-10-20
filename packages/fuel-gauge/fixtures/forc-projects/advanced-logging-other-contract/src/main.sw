contract;

use std::logging::log;

use advanced_logging_other_contract_abi::AdvancedLoggingOtherContract;

impl AdvancedLoggingOtherContract for Contract {
    fn msg_from_other_contract(a: u8) {
        log(__to_str_array("Hello from other Contract"));
        log(__to_str_array("Received value from main Contract:"));
        log(a);
    }
}
