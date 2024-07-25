script;

configurable {
    X: Option<u8> = Option::None,
    Y: Option<u8> = Option::None,
    Z: Option<u8> = Option::None,
}

fn main(x: Option<u8>, y: Option<u8>, z: Option<u8>) -> bool {
    assert_eq(x, X);
    assert_eq(y, Y);
    assert_eq(z, Z);
    true
}
