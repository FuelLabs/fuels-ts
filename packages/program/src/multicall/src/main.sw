script;

mod contract_call;

use std::contract_id::ContractId;
use std::{
    option::Option,
    tx::{tx_script_data_start_pointer},
};
use contract_call::*;


fn get_data_offset() -> u64 {
    raw_ptr_into_u64(tx_script_data_start_pointer()).add(__size_of::<ScriptData>())
}

fn raw_ptr_into_u64(ptr: raw_ptr) -> u64 {
    asm(r1: ptr) { r1: u64 }
}

fn main(script_data: ScriptData) -> ScriptReturn {
    let data_offset = get_data_offset();
    let val1: Option<CallValue> = Option::None;
    let val2: Option<CallValue> = Option::None;
    let val3: Option<CallValue> = Option::None;
    let val4: Option<CallValue> = Option::None;
    let val5: Option<CallValue> = Option::None;
    let mut call_returns: [Option<CallValue>; 5] = [val1, val2, val3, val4, val5];

    let mut i = 0;
    while i < 5 {
        match script_data.calls[i] {
            Option::Some(call) => {
                // Prepare the arg
                let fn_arg = match call.fn_arg {
                    CallValue::Value(val) => CallValue::Value(val),
                    CallValue::Data((call_offset, len)) => {
                        CallValue::Data((data_offset + call_offset, len))
                    },
                };
                // Make the call
                let result = call_contract(call.contract_id, call.fn_selector, fn_arg, call.parameters);
                call_returns[i] = Option::Some(result);
            },
            _ => {
                call_returns[i] = Option::None;
            },
        }

        // Iterate
        i = i + 1;
    };

    return ScriptReturn {
        call_returns: call_returns,
    };
}
