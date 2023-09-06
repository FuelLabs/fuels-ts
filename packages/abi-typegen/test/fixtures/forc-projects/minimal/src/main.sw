contract;

abi MyContract {
    fn main(x: str[10], y: str[10]) -> bool;
}

impl MyContract for Contract {
    fn main(x: str[10], y: str[10]) -> bool {
        true
    }
}
