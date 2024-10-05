script;

configurable {
    PIN: u64 = 1337,
}

fn main() -> u8 {
    log(PIN);
    99
}
