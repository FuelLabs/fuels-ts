predicate;

struct Validation {
    has_account: bool,
    total_complete: u64,
}

enum MyEnum {
    A: (),
    B: (),
}

fn main(vec: Vec<Validation>, enm: MyEnum, opt: Option<u8>) -> bool {
    return true;
}
