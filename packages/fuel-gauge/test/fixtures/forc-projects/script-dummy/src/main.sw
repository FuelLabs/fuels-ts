script;
configurable {
    SECRET_NUMBER: u64 = 9000,
}

fn main() -> bool {
    SECRET_NUMBER == 10001
}
