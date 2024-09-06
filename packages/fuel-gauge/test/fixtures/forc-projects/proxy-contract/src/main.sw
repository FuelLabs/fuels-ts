contract;

use std::execution::run_external;

abi Proxy {
    #[storage(write)]
    fn set_target_contract(id: ContractId);

    // this targets the method of the `large_contract project
    #[storage(read)]
    fn something() -> u64;
}

storage {
    target_contract: Option<ContractId> = None,
}

impl Proxy for Contract {
    #[storage(write)]
    fn set_target_contract(id: ContractId) {
        storage.target_contract.write(Some(id));
    }

    #[storage(read)]
    fn something() -> u64 {
        let target = storage.target_contract.read().unwrap();
        run_external(target)
    }
}
