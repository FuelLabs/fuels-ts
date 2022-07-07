// Library for calling contracts with unknown ABIs
library contract_call;

use std::contract_id::ContractId;
use std::context::registers::{return_length, return_value};

pub enum ContractFnArg {
    Value: u64,
    Reference: u64,
}

struct ContractCallData {
    contract_id: ContractId,
    fn_selector: u64,
    fn_arg_val_or_ptr: u64,
}

pub enum ContractCallReturn {
    Value: u64,
    Reference: (u64,
    u64), 
}

pub fn call_contract(contract_id: ContractId, fn_selector: u64, fn_arg: ContractFnArg, amount: u64, asset_id: b256, gas: u64) -> ContractCallReturn {
    let fn_arg_val_or_ptr = match fn_arg {
        ContractFnArg::Value(arg) => arg, ContractFnArg::Reference(ptr) => ptr, 
    };
    let call_data = ContractCallData {
        contract_id, fn_selector, fn_arg_val_or_ptr, 
    };
    asm(call_data: call_data, amount: amount, asset_id: asset_id, gas: gas) {
        call call_data amount asset_id gas;
    };
    match return_length() {
        0 => {
            let val = return_value();
            ContractCallReturn::Value(val)
        },
        len => {
            let ptr = return_value();
            ContractCallReturn::Reference((ptr, len))
        },
    }
}
