contract;

use std::{
    address::Address,
    option::Option,
};

struct TestStruct {
    option: Option<Address>
}

enum TestEnum {
    EnumOption: Option<Address>
}

const ADDR = 0xd58573593432a30a800f97ad32f877425c223a9e427ab557aab5d5bb89156db0;

abi MyContract {
    fn get_some_u64() -> Option<u64>;
    fn get_some_address() -> Option<Address>;
    fn get_some_struct() -> Option<TestStruct>;
    fn get_some_enum() -> Option<TestEnum>;
    fn get_some_tuple() -> Option<(TestStruct, TestEnum)>;
    fn get_none() -> Option<Address>;
    fn input_primitive(s: Option<u64>) -> bool;
    fn input_struct(s: Option<TestStruct>) -> bool;
    fn input_enum(e: Option<TestEnum>) -> bool;
    fn input_none(none: Option<Address>) -> bool;
}

impl MyContract for Contract {
    fn get_some_u64() -> Option<u64> {
        Option::Some(10)
    }

    fn get_some_address() -> Option<Address> {
        Option::Some(~Address::from(ADDR))
    }

    fn get_some_struct() -> Option<TestStruct> {
        Option::Some(TestStruct{option: Option::Some(~Address::from(ADDR))})
    }

    fn get_some_enum() -> Option<TestEnum> {
        Option::Some(TestEnum::EnumOption(Option::Some(~Address::from(ADDR))))
    }

    fn get_some_tuple() -> Option<(TestStruct, TestEnum)> {
        let s = TestStruct{option: Option::Some(~Address::from(ADDR))};
        let e = TestEnum::EnumOption(Option::Some(~Address::from(ADDR)));
        Option::Some((s,e))
    }

    fn get_none() -> Option<Address> {
        Option::None
    }

    fn input_primitive(input: Option<u64>) -> bool{
        if let Option::Some(u) = input {
            return u == 36;
        }
        false
    }

    fn input_struct(input: Option<TestStruct>) -> bool {
        if let Option::Some(s) = input {
            if let Option::Some(a) = s.option {
                return a == ~Address::from(ADDR);
            }
        }
        false
    }

    fn input_enum(input: Option<TestEnum>) -> bool {
        if let Option::Some(test_enum) = input {
            if let TestEnum::EnumOption(option) = test_enum {
                if let Option::Some(a) = option {
                    return a == ~Address::from(ADDR);
                }
            }
        }
        false
    }

    fn input_none(none: Option<Address>) -> bool {
        if let Option::None = none {
            return true;
        }
        false
    }
}
