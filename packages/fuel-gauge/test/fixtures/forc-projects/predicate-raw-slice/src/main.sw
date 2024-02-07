predicate;

#[allow(dead_code)]
enum SomeEnum<T> {
    First: bool,
    Second: T,
}

struct Wrapper<T> {
    inner: T,
    inner_enum: SomeEnum<raw_slice>,
}

fn valid_raw_slice(slice: raw_slice) -> bool {
    let vec: Vec<u8> = Vec::from(slice);
    vec.len() == 3 && vec.get(0).unwrap() == 40 && vec.get(1).unwrap() == 41 && vec.get(2).unwrap() == 42
}

fn valid_vec(vec: Vec<raw_slice>) -> bool {
    vec.len() == 2 && valid_raw_slice(vec.get(0).unwrap()) && valid_raw_slice(vec.get(1).unwrap())
}

fn main(wrapper: Wrapper<Vec<raw_slice>>) -> bool {
    if let SomeEnum::Second(enum_raw_slice) = wrapper.inner_enum
    {
        valid_raw_slice(enum_raw_slice) && valid_vec(wrapper.inner)
    } else {
        false
    }
}
