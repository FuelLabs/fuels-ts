library;

abi Foo {
    fn foo(foo_addr: Address, bar_addr: Address) -> u64;
    fn baz() -> u64;
}

abi Bar {
    fn bar(foo_addr: Address) -> u64;
}
