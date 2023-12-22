contract;

enum MyEnum<V> {
    Foo: u64,
    Bar: bool,
    Din: V,
}

struct FooStruct<T, U> {
    bim: T,
    bam: MyEnum<U>,
}

struct BarStruct<T> {
    x: T,
    b: u64,
}

struct FooBarStruct<T, U, C> {
    bim: T,
    bam: U,
    never_used: u64,
    foo: BarStruct<C>,
    foo_list: [C; 10],
}

abi MyContract {
    fn generic_type_function(
        arg1: [FooStruct<str[3], bool>; 3],
        arg2: [FooStruct<[b256; 3], bool>; 3],
        arg3: FooStruct<u64, str[3]>,
        arg4: FooStruct<bool, u64>,
    ) -> str[3];
    fn generic_complex_type_function(
        foo: FooBarStruct<u64, bool, b256>,
        bar: FooBarStruct<u64, u8, BarStruct<u64>>,
    ) -> (FooBarStruct<u64, bool, b256>, FooBarStruct<u64, u8, BarStruct<u64>>);
}

impl MyContract for Contract {
    fn generic_type_function(
        arg1: [FooStruct<str[3], bool>; 3],
        arg2: [FooStruct<[b256; 3], bool>; 3],
        arg3: FooStruct<u64, str[3]>,
        arg4: FooStruct<bool, u64>,
    ) -> str[3] {
        arg1[0].bim
    }
    fn generic_complex_type_function(
        foo: FooBarStruct<u64, bool, b256>,
        bar: FooBarStruct<u64, u8, BarStruct<u64>>,
    ) -> (FooBarStruct<u64, bool, b256>, FooBarStruct<u64, u8, BarStruct<u64>>) {
        (foo, bar)
    }
}
