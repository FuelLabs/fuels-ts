contract;

abi LargeContract {
    fn gen() -> bool;
}

impl LargeContract for Contract {
    fn gen() -> bool {
        asm() {
            blob i450000;
        }
        true
    }
}
