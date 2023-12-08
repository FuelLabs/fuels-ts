script;

use std::bytes::Bytes;

#[allow(dead_code)]
enum SomeEnum<T> {
    First: bool,
    Second: T,
}

struct Wrapper<T> {
    inner: T,
    inner_enum: SomeEnum<Bytes>,
}

fn expected_bytes() -> Bytes {
    let mut bytes = Bytes::new();

    bytes.push(40u8);
    bytes.push(41u8);
    bytes.push(42u8);

    bytes
}

fn main(_arg: u64, wrapper: Wrapper<Vec<Bytes>>) {
    if let SomeEnum::Second(enum_bytes) = wrapper.inner_enum {
        require(
            enum_bytes == expected_bytes(),
            "wrapper.inner_enum didn't carry the expected bytes",
        )
    } else {
        require(false, "enum was not of variant Second");
    }

    let inner_vec = wrapper.inner;
    require(
        inner_vec
            .len() == 2,
        "Expected wrapper.inner vector to have 2 elements",
    );
    require(
        inner_vec
            .get(0)
            .unwrap() == expected_bytes(),
        "wrapper.inner[0] didn't match expectation",
    );
    require(
        inner_vec
            .get(1)
            .unwrap() == expected_bytes(),
        "wrapper.inner[1] didn't match expectation",
    );
}
