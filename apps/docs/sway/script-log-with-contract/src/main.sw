// #region full
script;

abi LogSimple {
    fn log_simple(val: str[9]);
}

fn main(simple_contract_id: b256) {
    log("Script started");

    let log_contract = abi(LogSimple, simple_contract_id);
    // TODO: Add a method to call the log_simple method on the contract
    // ^^^^^^^^^^ No method "log_simple(ContractCaller<LogSimple>, str)" found for type "ContractCaller<LogSimpl
    // log_contract.log_simple("ContractA");

    log("Script finished");
}
// #endregion full
