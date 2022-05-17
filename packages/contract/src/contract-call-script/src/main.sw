script;

use std::contract_id::ContractId;

fn get_script_data<T>() -> T {
    // This line fixes a bug
    asm(r1: 0x0000000000000000000000000000000000000000000000000000000000000000) {}

    asm(r1: std::tx::tx_script_length()) {
        add r1 is r1;   // let script_data_ptr = is + script_length;
        r1: T           // return script_data_ptr as T;
    }
}

struct CallData {
    contract_id: ContractId,
    fn_selector: u64,
    fn_arg_or_ptr: u64,
}

fn call_contract(call_data: CallData, amount: u64, asset_id: b256) {
    asm(r1: call_data, r2: amount, r3: asset_id) {
        call r1 r2 r3 cgas;
    }
}

struct ScriptData {
    asset_id: b256,
    amount: u64,
    call_data: CallData
}

fn main() {
    let script_data = get_script_data::<ScriptData>();
    call_contract(script_data.call_data, script_data.amount, script_data.asset_id);
}
