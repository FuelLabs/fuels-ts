contract;

use std::execution::run_external;
use standards::{src14::SRC14};

pub enum ProxyErrors {
    TargetNotSet: (),
}

configurable {
    INITIAL_TARGET: ContractId = ContractId::zero(),
}

storage {
    SRC14 {
        target: Option<ContractId> = None,
    },
}

impl SRC14 for Contract {
    #[storage(read, write)]
    fn set_proxy_target(new_target: ContractId) {
        storage::SRC14.target.write(Some(new_target));
    }

    #[storage(read)]
    fn proxy_target() -> Option<ContractId> {
        Some(storage::SRC14.target.read().unwrap_or(INITIAL_TARGET))
    }
}

#[fallback]
#[storage(read)]
fn fallback() {
    let target = storage::SRC14.target.read().unwrap_or(INITIAL_TARGET);
    require(target.bits() != b256::zero(), ProxyErrors::TargetNotSet);
    run_external(target)
}
