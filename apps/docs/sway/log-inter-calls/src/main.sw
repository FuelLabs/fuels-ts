// #region full
contract;

use std::logging::log;

// Interface from the `LogSimple` contract
abi LogSimple {
    fn log_simple(val: str[9]);
}

// Interface for the contract
abi LogInterCalls {
    fn log_inter_call(contract_id: b256, simple_log_message: str[9]);
}

impl LogInterCalls for Contract {
    fn log_inter_call(contract_id: b256, simple_log_message: str[9]) {
        log("Starting inter-call");

        let logger = abi(LogSimple, contract_id);
        logger.log_simple(simple_log_message);

        log("Inter-call completed");
    }
}
// #endregion full
