// #region full
script;

use log_simple_abi::LogSimple;

fn main(contract_id: b256) {
    log("Script started");

    let log_contract = abi(LogSimple, contract_id);
    log_contract.log_simple("ContractA");

    log("Script finished");
}
// #endregion full
