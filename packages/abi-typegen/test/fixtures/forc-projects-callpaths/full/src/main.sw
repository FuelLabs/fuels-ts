contract;
use libs_for_testing::ExternalStruct;
use libs_for_testing::ExternalEnum;

pub struct InternalStruct {
    pub a: u8
}

pub enum InternalEnum {
    A: (),
    B: ()
}

abi MyContract {
    fn type_address(x: Address) -> Address;
    fn type_vector_u8(x: Vec<u8>) -> Vec<u8>;
    fn type_internal_struct(x: InternalStruct) -> InternalStruct;
    fn type_external_struct(x: ExternalStruct) -> ExternalStruct;
    fn type_option_enum(x: Option<u8>) -> Option<u8>;
    fn type_internal_enum(x: InternalEnum) -> InternalEnum;
    fn type_external_enum(x: ExternalEnum) -> ExternalEnum;
}

impl MyContract for Contract {
    fn type_address(x: Address) -> Address {
        x
    }
    fn type_vector_u8(x: Vec<u8>) -> Vec<u8> {
        x
    }
    fn type_external_struct(x: ExternalStruct) -> ExternalStruct {
        x
    }
    fn type_internal_struct(x: InternalStruct) -> InternalStruct {
        x
    }
    fn type_option_enum(x: Option<u8>) -> Option<u8> {
        x
    }
    fn type_internal_enum(x: InternalEnum) -> InternalEnum {
        x
    }
    fn type_external_enum(x: ExternalEnum) -> ExternalEnum {
        x
    }




}
