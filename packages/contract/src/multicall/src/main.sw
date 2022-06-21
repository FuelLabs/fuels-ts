// contract;
script;
dep contract_call;
dep buf;

use std::contract_id::ContractId;
use std::intrinsics::*;
use std::assert::*;
use std::mem::*;
use std::tx::get_script_data;
use std::option::*;
use std::revert::*;
use buf::*;
use contract_call::*;

fn null_of<T>() -> T {
    asm(r1: __size_of::<T>()) {
        aloc r1;
        addi r1 hp i1;
        r1: T
    }
}

enum CallArg {
    Value: u64,
    Reference: u64,
}

enum CallReturn {
    Value: u64,
    Reference: (u64,
    u64), 
}

struct Call {
    contract_id: ContractId,
    fn_selector: u64,
    fn_arg: CallArg,
    amount: u64,
    asset_id: b256,
}

struct ScriptData {
    calls: [Option<Call>;
    5],
}

struct ScriptReturn {
    call_returns: [Option<CallReturn>;
    5],
}

fn get_var_data() -> Buffer {
    let ptr = std::tx::tx_script_data_start_offset();
    let ptr = ptr + __size_of::<ScriptData>();
    let len = std::tx::tx_script_data_length() - __size_of::<ScriptData>();
    ~Buffer::from_ptr(ptr, len)
}

fn main(script_data: ScriptData) -> ScriptReturn {
    // TODO: Remove this line when the bug is fixed: https://github.com/FuelLabs/sway/issues/1585
    asm(r1: 0x0000000000000000000000000000000000000000000000000000000000000000) {
    };

    // Our script data is a fixed-size struct followed by a variable-length array of bytes.
    // ScriptData can represent only this fixed-size part,
    // and we will use a RawPointer to access the variable-length part,
    // which contains reference type call arguments' data
    let script_data = get_script_data::<ScriptData>();
    let var_data = get_var_data();

    let mut call_returns: [Option<CallReturn>;
    5] = null_of::<[Option<CallReturn>;
    5]>();
    let mut ret_data = ~Buffer::new();
    let mut i = 0;
    let calls_len = size_of_val(script_data.calls) / size_of::<Option<Call>>();
    while i < calls_len {
        match script_data.calls[i] {
            Option::Some(call) => {
                // Prepare the arg
                let fn_arg = match call.fn_arg {
                    CallArg::Value(arg) => ContractFnArg::Value(arg), CallArg::Reference(offset) => ContractFnArg::Reference(var_data.ptr() + offset), 
                };

                // Make the call
                let result = call_contract(call.contract_id, call.fn_selector, fn_arg, call.amount, call.asset_id, std::context::registers::context_gas(), );

                // Process the result
                let fn_ret = match result {
                    ContractCallReturn::Value(value) => CallReturn::Value(value), ContractCallReturn::Reference((ptr, len)) => {
                        let buf = ~Buffer::from_ptr(ptr, len);
                        let offset = ret_data.extend_from_buf(buf);
                        CallReturn::Reference((offset, len))
                    },
                };

                // call_returns[i] = Option::Some(fn_ret);
                let val: Option<CallReturn> = Option::Some(fn_ret);
                write(addr_of(call_returns[i]), val);
            },
            _ => {
                // call_returns[i] = Option::None;
                let val: Option<CallReturn> = Option::None;
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
