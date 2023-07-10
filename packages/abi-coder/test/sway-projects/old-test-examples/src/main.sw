contract;

struct Test {
    foo: u64,
    bar: u64
}

enum TestEnum {
    Value: bool,
    Data: bool
}

struct MyStruct {
    dummy_a: bool,
    dummy_b: u64
}

enum MyEnum {
    Foo: u64,
    Bar: bool,
    Din: bool
}

struct MyStructWithEnum {
    bim: str[3],
    bam: MyEnum
}

enum MyGenericEnum<V> {
    Foo: u64,
    Bar: bool,
}
struct MyGenericStruct<T, U> {
    bim: T,
    bam: MyGenericEnum<u64>,
}

struct MyOtherStruct {
    bom: u64,
}

struct StructWithImplicitGenerics<T, U> {
    arr: [T; 3],
    tuple: (T, U)
}

abi MyContract {
    fn entry_one(arg: u64) -> u64;
    fn sum(a:u64, b:u64) -> u64;
    fn sum_test(test: Test) -> u64;
    fn takes_array(arg: [str[3];3]) -> [str[3];2];
    fn take_enum(enum_arg: TestEnum) -> bool;
    fn my_struct(my_u64: u64, my_struct: MyStruct) -> u64;
    fn array_of_structs(arg1: [MyStructWithEnum;3]) -> str[3];
    fn complex_function(
        arg1: MyGenericStruct<[b256; 3], u8>,
        arg2: [MyGenericStruct<u64, bool>; 4],
        arg3: (str[5], bool),
        arg4: MyOtherStruct,
    );
    fn simple_vector(arg: Vec<u8>);
    
    fn struct_with_implicitGenerics(arg: StructWithImplicitGenerics<b256, u8>) -> u8;
    
}

impl MyContract for Contract {
    fn entry_one(arg: u64) -> u64 {arg}
    fn sum(a:u64, b:u64) -> u64 {a+b}
    fn sum_test(test: Test) -> u64 {test.foo + test.bar}
    fn takes_array(arg: [str[3];3]) -> [str[3];2] {[arg[0], arg[1]]}
    fn take_enum(enum_arg: TestEnum) -> bool {true}
    fn my_struct(my_u64: u64, my_struct: MyStruct) -> u64 {my_u64}
    fn array_of_structs(arg1: [MyStructWithEnum;3]) -> str[3] {arg1[0].bim}
    fn complex_function(
        arg1: MyGenericStruct<[b256; 3], u8>,
        arg2: [MyGenericStruct<u64, bool>; 4],
        arg3: (str[5], bool),
        arg4: MyOtherStruct,
    ) {}
    fn simple_vector(arg: Vec<u8>) {}
    fn struct_with_implicitGenerics(arg: StructWithImplicitGenerics<b256, u8>) -> u8 {1}
   
}
