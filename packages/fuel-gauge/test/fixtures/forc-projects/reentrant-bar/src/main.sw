contract;

use reentrant_foobar_abi::{Bar, Foo};

impl Bar for Contract {
    fn bar(foo_addr: Address) -> u64 {
        let foo = abi(Foo, foo_addr.into());
        foo.baz()
    }
}
