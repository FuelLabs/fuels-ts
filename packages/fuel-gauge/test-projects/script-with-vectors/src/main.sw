script;

use std::logging::log;

struct SomeStruct {
    some_number: u64,
    some_vec: Vec<u64> 
}

fn main(some_contract: ContractId, some_struct: SomeStruct) {
    log(some_struct.some_number);
    log(some_struct.some_vec.get(0).unwrap());
    require(some_struct.some_vec.get(0).unwrap() == 1, "values are not as expected");
}