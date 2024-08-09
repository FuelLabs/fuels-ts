contract;

abi MyContract {
    fn something() -> u64;
}

impl MyContract for Contract {
    fn something() -> u64 {
        asm() {
            blob i450000;
        }
        1001
    }
}
