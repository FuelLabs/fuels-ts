contract;

use foobar_abi::{Foo, Bar};

impl Foo for Contract {
    fn foo(foo_addr: Address, bar_addr: Address) -> u64 {
        let bar = abi(Bar, bar_addr.into());
        let _res = bar.bar(foo_addr);
        42
    }
    fn baz() -> u64 {
        1337
    }
}
