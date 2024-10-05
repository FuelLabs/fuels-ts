script;

configurable {
    CONFIGURABLE_VALUE: u64 = 1337,
}

fn main(input: u8) -> u8 {
    log(CONFIGURABLE_VALUE);
    input
}
