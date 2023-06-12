// contract;
script;

mod contract_call;

use std::contract_id::ContractId;
use std::intrinsics::*;
use std::assert::*;
use std::tx::tx_script_data;
use std::option::*;
use std::revert::*;
use std::logging::log;
use std::bytes::Bytes;
use contract_call::*;

fn null_of<T>() -> T {
    asm(size: __size_of::<T>(), r1) {
        aloc size;
        addi r1 hp i1;
        r1: T
    }
}

struct MulticallCall {
    contract_id: ContractId,
    fn_selector: u64,
    fn_arg: CallValue,
    parameters: CallParameters,
}

struct ScriptData {
    calls: [Option<MulticallCall>;
    5],
}

struct ScriptReturn {
    call_returns: [Option<CallValue>;
    5],
}

fn get_var_data() -> Bytes {
    let ptr = std::tx::tx_script_data_start_pointer().add_uint_offset(__size_of::<ScriptData>());
    let len = std::tx::tx_script_data_length() - __size_of::<ScriptData>();
    Bytes::from_raw_slice(raw_slice::from_parts::<u8>(ptr, len))
}

fn main(script_data: ScriptData) -> ScriptReturn {
    let var_data = get_var_data();
    let mut call_returns: [Option<CallValue>; 5] = null_of::<[Option<CallValue>; 5]>();
    let mut ret_data = Bytes::new();
    let mut i = 0;
    let calls_len = size_of_val(script_data.calls) / size_of::<Option<MulticallCall>>();

    while i < calls_len {
        match script_data.calls[i] {
            Option::Some(call) => {
                // Prepare the arg
                let fn_arg = match call.fn_arg {
                    CallValue::Value(val) => {
                        CallValue::Value(val)
                    }
                    CallValue::Data((offset, len)) => {
                        let ptr = var_data.as_raw_slice().ptr().add_uint_offset(offset);
                        let ptr: u64 = asm(ptr: ptr) { ptr: u64 };
                        CallValue::Data((ptr, len))
                    }
                };

                // Make the call
                let result = call_contract(call.contract_id, call.fn_selector, fn_arg, call.parameters);

                // Process the result
                let fn_ret = match result {
                    CallValue::Value(value) => CallValue::Value(value), CallValue::Data((ptr, len)) => {
                        let ptr: raw_ptr = asm(ptr: ptr) { ptr: raw_ptr };
                        let buf = Bytes::from_raw_slice(raw_slice::from_parts::<u8>(ptr, len));
                        let old_len = ret_data.as_raw_slice().len::<u8>();
                        ret_data.append(buf);
                        CallValue::Data((old_len, len))
                    },
                };

                call_returns[i] = Option::Some(fn_ret);
            },
            _ => {
                call_returns[i] = Option::None;
            },
        }

        // Iterate
        i = i + 1;
    };

    ScriptReturn { call_returns }
}
