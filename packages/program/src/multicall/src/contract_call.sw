library;

use std::{
    constants::BASE_ASSET_ID,
    contract_id::ContractId,
    registers::{
        context_gas,
        return_length,
        return_value,
    },
};

pub enum CallValue {
    Value: u64,
    Data: (u64, u64),
}

pub struct CallParameters {
    amount: Option<u64>,
    asset_id: Option<ContractId>,
    gas: Option<u64>,
    is_return_data_on_heap: bool,
}

pub struct MulticallCall {
    contract_id: ContractId,
    fn_selector: u64,
    fn_arg: CallValue,
    parameters: CallParameters,
}

pub struct ScriptData {
    calls: [Option<MulticallCall>; 5],
}

pub struct ScriptReturn {
    call_returns: [Option<CallValue>; 5],
}

/// Calls the given contract function.
pub fn call_contract(
    id: ContractId,
    fn_selector: u64,
    fn_arg: CallValue,
    call_parameters: CallParameters,
) -> CallValue {
    // Prepare the data for the call
    let fn_arg = match fn_arg {
        CallValue::Value(val) => val,
        CallValue::Data((ptr, _)) => ptr,
    };
    let call_data = (id, fn_selector, fn_arg);
    let amount = match call_parameters.amount {
        Option::Some(amount) => amount,
        Option::None => 0,
    };
    let asset_id = match call_parameters.asset_id {
        Option::Some(id) => id,
        Option::None => BASE_ASSET_ID,
    };
    let gas = match call_parameters.gas {
        // Forward gas by the given amount
        Option::Some(gas) => gas, // No limit, so forward all gas available in the context
        Option::None => context_gas(),
    };

    // Execute the CALL instruction to call the contract
    asm(call_data: call_data, amount: amount, asset_id: asset_id, gas: gas) {
        call call_data amount asset_id gas;
    };

    // Parse the return value
    match return_length() {
        // A copy type was returned with a RET instruction
        0 => {
            let val = return_value();
            CallValue::Value(val)
        },
        // A reference type was returned with a RETD instruction
        len => {
            let ptr = return_value();
            CallValue::Data((ptr, len))
        },
    }
}
