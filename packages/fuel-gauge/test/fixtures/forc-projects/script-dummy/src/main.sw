script;
configurable {
    SECRET_NUMBER: u64 = 9000,
}

fn main() -> bool {
    log(SECRET_NUMBER);
    SECRET_NUMBER == 10001
}
