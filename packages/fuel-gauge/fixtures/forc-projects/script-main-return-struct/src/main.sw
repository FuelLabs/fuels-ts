script;

struct Baz {
    x: u8,
}

fn main(foo: u8, bar: Baz) -> Baz {
    Baz { x: bar.x + foo }
}
