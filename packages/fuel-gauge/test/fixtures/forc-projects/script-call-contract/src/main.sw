script;

use advanced_logging_abi::AdvancedLogging;

fn main(contract_id: b256, other_contract_id: b256, amount_to_contract: u8) {
    log(__to_str_array("Hello from script"));

    let log_contract = abi(AdvancedLogging, contract_id);

    log_contract.test_log_from_other_contract(amount_to_contract, other_contract_id);
}
