contract;
use libs_for_testing::ExternalStruct;

pub struct InternalStruct {
    pub a: u8
}

abi MyContract {
    fn type_address(x: Address) -> Address;
    fn type_vector_u8(x: Vec<u8>) -> Vec<u8>;
    fn type_internal_struct(x: InternalStruct) -> InternalStruct;
    fn type_external_struct(x: ExternalStruct) -> ExternalStruct;
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

}
