contract;
use std::b512::B512;

enum EnumWithGeneric<T>{
    VariantOne: T,
    VariantTwo: u64
}

configurable {
    U8: u8 = 8u8,
    BOOL: bool = true,
    ARRAY: [u32; 3] = [253u32, 254u32, 255u32],
    STR_4: str[4] = "fuel",
    STRUCT: StructA<u8, bool> = StructA {
        propA1: 8u8,
        propA2: true,
    },
    ENUM: EnumWithGeneric<bool> = EnumWithGeneric::VariantOne(true),
}

struct StructA <T, U>{
  propA1: T,
  propA2: U,
}

struct StructB <T>{
  propB1: T,
}

struct StructC {
  propC1: StructA<StructB<u8>, u16>,
}

struct SimpleStruct {
  a: bool,
  b: u32
}

enum Color {
    Blue: (),
    Green: (),
    Red: (),
    Silver: (),
    Grey: (),
}


enum EnumWithBuiltinType {
  a: bool,
  b: u64
}

enum EnumWithStructs {
  a: Color,
  b: SimpleStruct,
  c: StructA<u64, SimpleStruct>
}

struct StructWithImplicitGenerics<T, U> {
    arr: [T; 3],
    tuple: (T, U)
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

enum MyEnum {
    Foo: u64,
    Bar: bool,
    Din: bool
}

struct MyStructWithEnum {
    bim: str[3],
    bam: MyEnum
}
struct MyStruct {
    dummy_a: bool,
    dummy_b: u64
}
struct Test {
    foo: u64,
    bar: u64
}

enum TestEnum {
    Value: bool,
    Data: bool
}

enum EnumWithVector {
    num: u8,
    vec: Vec<u8>
}

struct StructWithVector {
    num: u8,
    vec: Vec<u8>
}

abi MyContract {
    fn test_function() -> bool;
    fn u_8(arg: u8) -> u8;
    fn u_16(arg: u16) -> u16;
    fn u_32(arg: u32) -> u32;
    fn u_64(arg: u64) -> u64;
    fn string(arg: str[5]) -> str[5];
    fn boolean(arg: bool) -> bool;
    fn b_256(arg: b256) -> b256;
    fn b_512(arg: B512) -> B512;
    fn two_args(arg1: b256, arg2: bool) -> bool;
    fn struct_simple(x: SimpleStruct) -> u8;
    fn struct_generic_simple(x: StructB<u8>) -> u8;
    fn struct_with_tuple(x: StructB<(bool, u64)>) -> u8;
    fn struct_with_implicitGenerics(arg: StructWithImplicitGenerics<b256, u8>) -> u8;
    
    fn tuple_as_param(x: (u8, StructA<StructB<u64>, str[3]>)) -> u8;
    fn array_simple(x: [u8; 4]) -> u8;
    fn array_struct(x: [SimpleStruct; 3]) -> u8;
    fn vector_boolean(x: Vec<bool>) -> u8;
    fn vector_u8(x: Vec<u8>) -> u8;
    fn arg_then_vector_u8(a: SimpleStruct, x: Vec<u8>) -> u8;
    fn vector_u8_then_arg(x: Vec<u8>, y: b256) -> u8;
    fn two_u8_vectors(x: Vec<u8>, y: Vec<u8>) -> u8;
    fn u32_then_three_vectors_u64(x: u32, y: Vec<u64>, z: Vec<u64>, q: Vec<u64>) -> u8;
    fn enum_simple(x: Color) -> u8;
    fn enum_with_builtin_type(x: EnumWithBuiltinType) -> u8;
    fn enum_with_structs(x: EnumWithStructs) -> u8;
    fn option_u8(x: Option<u8>) -> u8;
    fn return_configurables() -> (u8, bool, [u32; 3], str[4], StructA<u8, bool>);
    
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

    fn vector_inside_vector(arg: Vec<Vec<u32>>);
    fn vector_inside_array(arg: [Vec<u32>; 1]);
    fn vector_inside_enum(arg: EnumWithVector);
    fn vector_inside_struct(arg: StructWithVector);
}

impl MyContract for Contract {
    fn test_function() -> bool {true}
    fn u_8(arg: u8) -> u8 {arg}
    fn u_16(arg: u16) -> u16 {arg}
    fn u_32(arg: u32) -> u32 {arg}
    fn u_64(arg: u64) -> u64 {arg}
    fn string(arg: str[5]) -> str[5] {arg}
    fn boolean(arg: bool) -> bool {arg}
    fn b_256(arg: b256) -> b256 {arg}
    fn b_512(arg: B512) -> B512 {arg}
    fn two_args(arg1: b256, arg2: bool) -> bool {arg2}
    fn struct_simple(x: SimpleStruct) -> u8 { 1 }
    fn struct_generic_simple(x: StructB<u8>) -> u8 {1}
    fn struct_with_tuple(x: StructB<(bool, u64)>) -> u8 {1}
    fn tuple_as_param(x: (u8, StructA<StructB<u64>, str[3]>)) -> u8 {1}
    fn vector_boolean(x: Vec<bool>) -> u8 {1}
    fn vector_u8(x: Vec<u8>) -> u8 {1}
    fn enum_simple(x: Color) -> u8 {1}
    fn enum_with_builtin_type(x: EnumWithBuiltinType) -> u8 { 1 }    
    fn enum_with_structs(x: EnumWithStructs) -> u8 {1}
    fn array_simple(x: [u8; 4]) -> u8 { 1 }
    fn array_struct(x: [SimpleStruct; 3]) -> u8 {1}
    fn option_u8(x: Option<u8>) -> u8 {1}
    fn arg_then_vector_u8(a: SimpleStruct, x: Vec<u8>) -> u8 {1}
    fn vector_u8_then_arg(x: Vec<u8>, y: b256) -> u8 {1}
    fn struct_with_implicitGenerics(arg: StructWithImplicitGenerics<b256, u8>) -> u8 {1}
    
    fn two_u8_vectors(x: Vec<u8>, y: Vec<u8>) -> u8 {1}
    fn u32_then_three_vectors_u64(x: u32, y: Vec<u64>, z: Vec<u64>, q: Vec<u64>) -> u8 {1}
    
    
    fn return_configurables() -> (u8, bool, [u32; 3], str[4], StructA<u8, bool>) {
        (U8, BOOL, ARRAY, STR_4, STRUCT)
    }
    
    // these are examples for testing signature and selector generation
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
    fn vector_inside_vector(arg: Vec<Vec<u32>>) {}
    fn vector_inside_array(arg: [Vec<u32>; 1]) {}
    fn vector_inside_enum(arg: EnumWithVector) {}
    fn vector_inside_struct(arg: StructWithVector) {}

}
