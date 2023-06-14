// contract;
script;
mod contract_call;
mod buf;

use std::contract_id::ContractId;
use std::intrinsics::*;
use std::assert::*;
use std::tx::tx_script_data;
use std::option::*;
use std::revert::*;
use std::logging::log;
use buf::*;
use contract_call::*;

struct MulticallCall {
    contract_id: ContractId,
    fn_selector: u64,
    fn_arg: CallValue,
    parameters: CallParameters,
}

struct ScriptData {
    calls: [Option<MulticallCall>; 5],
}

struct ScriptReturn {
    call_returns: [Option<CallValue>; 5],
}

fn get_var_data() -> Buffer {
    let ptr: raw_ptr = std::tx::tx_script_data_start_pointer();
    let pointer: raw_ptr = ptr.add::<u64>(__size_of::<ScriptData>());
    let len = std::tx::tx_script_data_length() - __size_of::<ScriptData>();
    Buffer::from_ptr(pointer, len)
}

fn raw_ptr_from_u64(ptr: u64) -> raw_ptr {
    asm(r1: ptr) { r1: raw_ptr }
}

fn raw_ptr_into_u64(ptr: raw_ptr) -> u64 {
    asm(r1: ptr) { r1: u64 }
}

fn main(script_data: ScriptData) {
    let var_data = get_var_data();
    let val1: Option<CallValue> = Option::None;
    let val2: Option<CallValue> = Option::None;
    let val3: Option<CallValue> = Option::None;
    let val4: Option<CallValue> = Option::None;
    let val5: Option<CallValue> = Option::None;
    let mut call_returns: [Option<CallValue>; 5] = [val1, val2, val3, val4, val5];
    let mut ret_data = Buffer::new();
    let mut i = 0;
    let calls_len = size_of_val(script_data.calls) / size_of::<Option<MulticallCall>>();

    while i < calls_len {
        match script_data.calls[i] {
            Option::Some(call) => {
                // Prepare the arg
                let fn_arg = match call.fn_arg {
                    CallValue::Value(val) => CallValue::Value(val),
                    CallValue::Data((offset, len)) => CallValue::Data((raw_ptr_into_u64(var_data.ptr()) + offset, len)),
                };

                // Make the call
                let result = call_contract(call.contract_id, call.fn_selector, fn_arg, call.parameters);

                // Process the result
                let fn_ret = match result {
                    CallValue::Value(value) => CallValue::Value(value),
                    CallValue::Data((ptr, len)) => {
                        let buf = Buffer::from_ptr(raw_ptr_from_u64(ptr), len);
                        let offset = ret_data.extend_from_buf(buf);
                        CallValue::Data((offset, len))
                    },
                };

                // call_returns[i] = Option::Some(fn_ret);
                let val: Option<CallValue> = Option::Some(fn_ret);
                __addr_of(call_returns[i]).write(val);
            },
            _ => {
                // call_returns[i] = Option::None;
                let val: Option<CallValue> = Option::None;
                __addr_of(call_returns[i]).write(val);
            },
        }

        // Iterate
        i = i + 1;
    };
}
