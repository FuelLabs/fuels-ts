script;

use advanced_logging_abi::AdvancedLogging;
use advanced_logging_other_contract_abi::AdvancedLoggingOtherContract;

fn main(contract_a_id: b256, contract_b_id: b256) -> bool {
    log("log from script 1");

    let contract_a = abi(AdvancedLogging, contract_a_id);

    contract_a.test_log_from_other_contract(10, contract_b_id);

    log("log from script 2");

    true
}
