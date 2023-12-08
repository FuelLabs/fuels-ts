script;

#[allow(dead_code)]
enum SomeEnum<T> {
    First: bool,
    Second: T,
}

struct Wrapper<T> {
    inner: T,
    inner_enum: SomeEnum<raw_slice>,
}

fn validate_raw_slice(input: raw_slice) {
    let vec: Vec<u64> = Vec::from(input);
    require(vec.len() == 3, "raw slice len is not 3");
    require(
        vec
            .get(2)
            .unwrap() == 42,
        "expected 3rd slice entry to be 42",
    );
    require(
        vec
            .get(1)
            .unwrap() == 41,
        "expected 2nd slice entry to be 41",
    );
    require(
        vec
            .get(0)
            .unwrap() == 40,
        "expected 1st slice entry to be 40",
    );
}

fn validate_vec(vec: Vec<raw_slice>) {
    require(vec.len() == 2, "vec should have two elements");
    validate_raw_slice(vec.get(0).unwrap());
    validate_raw_slice(vec.get(1).unwrap());
}

fn main(_arg: u64, wrapper: Wrapper<Vec<raw_slice>>) -> raw_slice {
    if let SomeEnum::Second(enum_raw_slice) = wrapper.inner_enum
    {
        validate_raw_slice(enum_raw_slice);
    } else {
        require(false, "enum was not of variant Second");
    }

    validate_vec(wrapper.inner);

    let mut rtn: Vec<u64> = Vec::new();
    rtn.push(1);
    rtn.push(2);
    rtn.push(3);

    rtn.as_raw_slice()
}
