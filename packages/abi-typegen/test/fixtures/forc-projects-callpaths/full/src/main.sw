contract;
use libs_for_testing::ExternalStruct;

abi MyContract {
    fn address(x: Address) -> Address;
}

impl MyContract for Contract {
    fn address(x: Address) -> Address {
        x
    }
}
