contract;

use std::logging::log;
use std::context::*;
use std::call_frames::*;
use std::registers::context_gas;
use std::contract_id::ContractId;
use std::bytes::Bytes;

enum TestB256Enum {
    Value: b256,
    Data: b256,
}

enum TestBoolEnum {
    Value: bool,
    Data: bool,
}

enum TestStringEnum {
    Value: str[3],
    Data: str[3],
}

struct TestStruct {
    a: bool,
    b: u64,
}

struct SumStruct {
    a: u64,
    b: u64,
}

struct SingleParamStruct {
    a: u64,
}

abi TestContract {
    fn foo(value: u64) -> u64;
    fn call_external_foo(param: u64, contract_id: b256) -> u64;
    fn boo(value: TestStruct) -> TestStruct;
    fn empty(empty: ()) -> u64;
    fn empty_then_value(empty: (), value: u8) -> u64;
    fn value_then_empty(value: u8, empty: ()) -> u64;
    fn value_then_empty_then_value(value: u8, empty: (), value2: u8) -> u64;
    fn no_params() -> u64;
    fn sum(a: u64, b: u64) -> u64;
    fn sum_test(a: u64, test: SumStruct) -> u64;
    fn sum_single(test: SumStruct) -> u64;
    fn sum_multparams(a: u64, b: u64, c: u64, d: u64, e: u64) -> u64;
    fn echo_b256(a: b256) -> b256;
    fn add_ten(param: SingleParamStruct) -> u64;
    fn return_void();
    fn return_vector(vector: Vec<u8>) -> Vec<u8>;
    fn return_bytes() -> Bytes;

    #[payable]
    fn return_context_amount() -> u64;

    #[payable]
    fn return_context_asset() -> b256;

    #[payable]
    fn return_context_gas() -> u64;

    fn take_array_string_shuffle(a: [str[3]; 3]) -> [str[3]; 3];
    fn take_array_string_return_single(a: [str[3]; 3]) -> [str[3]; 1];
    fn take_array_string_return_single_element(a: [str[3]; 3]) -> str[3];
    fn take_array_number(a: [u64; 3]) -> u64;
    fn take_array_boolean(a: [bool; 3]) -> bool;
    fn take_b256_enum(a: TestB256Enum) -> b256;
    fn take_bool_enum(enum_arg: TestBoolEnum) -> bool;
    fn take_string_enum(enum_arg: TestStringEnum) -> str[3];
    fn assert_u8(value_1: u8, value_2: u8);
}

impl TestContract for Contract {
    fn foo(value: u64) -> u64 {
        log(value);
        value + 1
    }
    fn call_external_foo(param: u64, contract_id: b256) -> u64 {
        let external_contract = abi(TestContract, contract_id);
        let response = external_contract.foo(param);
        response + 1
    }
    fn boo(value: TestStruct) -> TestStruct {
        log(value.b);
        TestStruct {
            a: !value.a,
            b: value.b + 1,
        }
    }
    fn empty(value: ()) -> u64 {
        63
    }
    fn empty_then_value(empty: (), value: u8) -> u64 {
        63
    }
    fn value_then_empty(value: u8, empty: ()) -> u64 {
        63
    }
    fn value_then_empty_then_value(value: u8, empty: (), value2: u8) -> u64 {
        63
    }
    fn no_params() -> u64 {
        50
    }
    fn sum(a: u64, b: u64) -> u64 {
        a + b
    }
    fn sum_test(a: u64, test: SumStruct) -> u64 {
        a + test.a + test.b
    }
    fn sum_single(test: SumStruct) -> u64 {
        test.a + test.b
    }
    fn sum_multparams(a: u64, b: u64, c: u64, d: u64, e: u64) -> u64 {
        a + b + c + d + e
    }
    fn echo_b256(a: b256) -> b256 {
        a
    }
    fn add_ten(param: SingleParamStruct) -> u64 {
        param.a + 10
    }
    fn return_void() {
        log(3735928559);
    }

    #[payable]
    fn return_context_amount() -> u64 {
        msg_amount()
    }

    #[payable]
    fn return_context_asset() -> b256 {
        msg_asset_id().bits()
    }

    #[payable]
    fn return_context_gas() -> u64 {
        context_gas()
    }
    fn take_array_string_shuffle(a: [str[3]; 3]) -> [str[3]; 3] {
        [a[2], a[0], a[1]]
    }
    fn take_array_string_return_single(a: [str[3]; 3]) -> [str[3]; 1] {
        [a[0]]
    }
    fn take_array_string_return_single_element(a: [str[3]; 3]) -> str[3] {
        a[0]
    }
    fn take_array_number(a: [u64; 3]) -> u64 {
        a[0]
    }
    fn take_array_boolean(a: [bool; 3]) -> bool {
        a[0]
    }
    fn take_b256_enum(enum_arg: TestB256Enum) -> b256 {
        let enum_arg = match enum_arg {
            TestB256Enum::Value(val) => val,
            TestB256Enum::Data(val) => val,
        };
        enum_arg
    }
    fn take_bool_enum(enum_arg: TestBoolEnum) -> bool {
        let enum_arg = match enum_arg {
            TestBoolEnum::Value(val) => val,
            TestBoolEnum::Data(val) => val,
        };
        enum_arg
    }
    fn take_string_enum(enum_arg: TestStringEnum) -> str[3] {
        let enum_arg = match enum_arg {
            TestStringEnum::Value(val) => val,
            TestStringEnum::Data(val) => val,
        };
        enum_arg
    }
    fn return_vector(vector: Vec<u8>) -> Vec<u8> {
        vector
    }
    fn return_bytes() -> Bytes {
        let bytes = Bytes::with_capacity(8);

        bytes
    }
    fn assert_u8(value_1: u8, value_2: u8) {
        assert(value_1 == value_2);
    }
}
