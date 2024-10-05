predicate;

configurable {
    SECRET_NUMBER: u64 = 9000,
}

fn main(arg: u64) -> bool {
    SECRET_NUMBER == arg
}
