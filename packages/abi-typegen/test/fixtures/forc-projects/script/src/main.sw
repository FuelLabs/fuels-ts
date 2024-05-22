script;

struct Score {
    user: u8,
    points: u8,
}

enum MyGenericEnum<T> {
    a: T,
}

struct MyGenericStruct<T> {
    a: T,
}

fn main(
    vec: Vec<Score>,
    enm: MyGenericEnum<u16>,
    opt: Option<u8>,
    res: Result<MyGenericStruct<str[4]>, u64>,
) -> bool {
    return true;
}
