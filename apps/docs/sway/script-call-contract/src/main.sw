script;

mod counter;

// #region transaction-request-7
use counter::{CounterAbi};

fn main(contract_id: ContractId) -> u64 {
    let counter_contract = abi(CounterAbi, contract_id.into());

    counter_contract.get_count()
}
// #endregion transaction-request-7
