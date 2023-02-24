// contract;
script;
dep contract_call;
dep buf;

use std::contract_id::ContractId;
use std::intrinsics::*;
use std::assert::*;
use std::mem::*;
use std::tx::tx_script_data;
use std::option::*;
use std::revert::*;
use std::logging::log;
use buf::*;
use contract_call::*;

fn null_of<T>() -> T {
    asm(r1: __size_of::<T>()) {
        aloc r1;
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

fn get_var_data() -> Buffer {
    let ptr = std::tx::tx_script_data_start_pointer();
    let ptr = ptr + __size_of::<ScriptData>();
    let len = std::tx::tx_script_data_length() - __size_of::<ScriptData>();
    ~Buffer::from_ptr(ptr, len)
}

fn main(script_data: ScriptData) -> ScriptReturn {
    let var_data = get_var_data();
    let mut call_returns: [Option<CallValue>; 5] = null_of::<[Option<CallValue>; 5]>();
    let mut ret_data = ~Buffer::new();
    let mut i = 0;
    let calls_len = size_of_val(script_data.calls) / size_of::<Option<MulticallCall>>();

    while i < calls_len {
        match script_data.calls[i] {
            Option::Some(call) => {
                // Prepare the arg
                let fn_arg = match call.fn_arg {
                    CallValue::Value(val) => CallValue::Value(val), CallValue::Data((offset, len)) => CallValue::Data((var_data.ptr() + offset, len)), 
                };

                // Make the call
                let result = call_contract(call.contract_id, call.fn_selector, fn_arg, call.parameters);

                // Process the result
                let fn_ret = match result {
                    CallValue::Value(value) => CallValue::Value(value), CallValue::Data((ptr, len)) => {
                        let buf = ~Buffer::from_ptr(ptr, len);
                        let offset = ret_data.extend_from_buf(buf);
                        CallValue::Data((offset, len))
                    },
                };

                // call_returns[i] = Option::Some(fn_ret);
                let val: Option<CallValue> = Option::Some(fn_ret);
                write(addr_of(call_returns[i]), val);
            },
            _ => {
                // call_returns[i] = Option::None;
                let val: Option<CallValue> = Option::None;
                write(addr_of(call_returns[i]), val);
            },
        }

        // Iterate
        i = i + 1;
    };

    let script_ret = ScriptReturn {
        call_returns
    };

    let mut buf = ~Buffer::new();
    buf.extend_from_ptr(addr_of(script_ret), size_of_val(script_ret));
    buf.extend_from_buf(ret_data);

    asm(ptr: buf.ptr(), len: buf.len()) {
        retd ptr len;
    }

    // unreachable
    script_ret
}
