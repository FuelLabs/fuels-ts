contract;

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

abi MyContract {
    fn accept_bytes(bytes: Bytes);
    fn accept_nested_bytes(wrapper: Wrapper<Vec<Bytes>>);
    fn return_bytes(len: u8) -> Bytes;
}

impl MyContract for Contract {
    fn accept_bytes(bytes: Bytes) {
        require(
            bytes == expected_bytes(),
            "given bytes didn't match the expected bytes",
        );
    }

    fn accept_nested_bytes(wrapper: Wrapper<Vec<Bytes>>) {
        if let SomeEnum::Second(enum_bytes) = wrapper.inner_enum {
            let exp = expected_bytes();
            require(
                enum_bytes
                    .get(0)
                    .unwrap() == exp
                    .get(0)
                    .unwrap(),
                "wrapper.inner_enum 0 didnt match",
            );
            require(
                enum_bytes
                    .get(1)
                    .unwrap() == exp
                    .get(1)
                    .unwrap(),
                "wrapper.inner_enum 1 didnt match",
            );
            require(
                enum_bytes
                    .get(2)
                    .unwrap() == exp
                    .get(2)
                    .unwrap(),
                "wrapper.inner_enum 2 didnt match",
            );
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

    fn return_bytes(len: u8) -> Bytes {
        let mut bytes = Bytes::new();
        let mut i: u8 = 0;
        while i < len {
            bytes.push(i);
            i += 1u8;
        }
        bytes
    }
}
