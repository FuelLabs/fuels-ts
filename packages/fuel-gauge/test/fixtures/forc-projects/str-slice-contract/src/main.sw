contract;

abi MyContract {
    fn echoes_str_slice(arg: str) -> str;
}

impl MyContract for Contract {
    fn echoes_str_slice(arg: str) -> str {
        assert_eq(arg, "contract-input");

        "contract-return"
    }
}
