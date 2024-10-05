script;

configurable {
    PIN: u64 = 1337,
}

fn main(input: u8) -> u8 {
    log(PIN);
    input
}
