contract;
use std::b512::B512;
use std::bytes::Bytes;
use std::string::String;
use std::message::send_typed_message;

enum EnumWithGeneric<A> {
    VariantOne: A,
    VariantTwo: u64,
}

configurable {
    U8: u8 = 8u8,
    BOOL: bool = true,
    ARRAY: [u32; 3] = [253u32, 254u32, 255u32],
    STR_4: str[4] = __to_str_array("fuel"),
    STRUCT: StructA<u8, bool> = StructA {
        propA1: 8u8,
        propA2: true,
    },
    ENUM: EnumWithGeneric<bool> = EnumWithGeneric::VariantOne(true),
}

struct StructA<B, C> {
    propA1: B,
    propA2: C,
}

struct StructB<D> {
    propB1: D,
}

struct StructC {
    propC1: StructA<StructB<u8>, u16>,
}

struct SimpleStruct {
    a: bool,
    b: u32,
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
    b: u64,
}

enum EnumWithStructs {
    a: Color,
    b: SimpleStruct,
    c: StructA<u64, SimpleStruct>,
}

struct StructWithImplicitGenerics<E, F> {
    arr: [E; 3],
    tuple: (E, F),
}

enum MyGenericEnum<V> {
    Foo: u64,
    Bar: bool,
}
struct MyGenericStruct<G, H> {
    bim: G,
    bam: MyGenericEnum<u64>,
}

struct MyOtherStruct {
    bom: u64,
}

enum MyEnum {
    Foo: u64,
    Bar: bool,
    Din: bool,
}

struct MyStructWithEnum {
    bim: str[3],
    bam: MyEnum,
}
struct MyStruct {
    dummy_a: bool,
    dummy_b: u64,
}
struct Test {
    foo: u64,
    bar: u64,
}

enum TestEnum {
    Value: bool,
    Data: bool,
}

enum EnumWithVector {
    num: u8,
    vec: Vec<u8>,
}

struct StructWithVector {
    num: u8,
    vec: Vec<u8>,
}

struct MyStructWithGeneric<I, J> {
    bim: I,
    bam: StructB<J>,
    bom: StructA<I, J>,
}

struct ArrWithGenericStruct<K> {
    a: [MyStructWithGeneric<K, u8>; 3],
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
    fn two_args(arg1: b256, arg2: bool) -> (b256, bool);
    fn struct_simple(x: SimpleStruct) -> SimpleStruct;
    fn struct_generic_simple(x: StructB<u8>) -> StructB<u8>;
    fn struct_with_tuple(x: StructB<(bool, u64)>) -> StructB<(bool, u64)>;
    fn struct_with_implicit_generics(
        arg: StructWithImplicitGenerics<b256, u8>,
    ) -> StructWithImplicitGenerics<b256, u8>;
    fn bytes(arg: Bytes) -> Bytes;
    fn raw_slice(arg: raw_slice) -> raw_slice;
    fn dynamic_string(arg: String) -> String;
    fn asset_id(arg: AssetId) -> AssetId;

    fn tuple_as_param(x: (u8, StructA<StructB<u64>, str[3]>)) -> (u8, StructA<StructB<u64>, str[3]>);
    fn array_simple(x: [u8; 4]) -> [u8; 4];
    fn array_struct(x: [SimpleStruct; 3]) -> [SimpleStruct; 3];
    fn vector_boolean(x: Vec<bool>) -> Vec<bool>;
    fn vector_u8(x: Vec<u8>) -> Vec<u8>;
    fn arg_then_vector_u8(a: SimpleStruct, x: Vec<u8>) -> (SimpleStruct, Vec<u8>);
    fn vector_u8_then_arg(x: Vec<u8>, y: b256) -> (Vec<u8>, b256);
    fn two_u8_vectors(x: Vec<u8>, y: Vec<u8>) -> (Vec<u8>, Vec<u8>);
    fn u32_then_three_vectors_u64(
        x: u32,
        y: Vec<u64>,
        z: Vec<u64>,
        q: Vec<u64>,
    ) -> (u32, Vec<u64>, Vec<u64>, Vec<u64>);
    fn enum_simple(x: Color) -> Color;
    fn enum_with_builtin_type(x: EnumWithBuiltinType) -> EnumWithBuiltinType;
    fn enum_with_structs(x: EnumWithStructs) -> EnumWithStructs;
    fn option_u8(x: Option<u8>) -> Option<u8>;
    fn return_configurables() -> (u8, bool, [u32; 3], str[4], StructA<u8, bool>);
    fn simple_vector(arg: Vec<u8>) -> Vec<u8>;
    fn vector_inside_vector(arg: Vec<Vec<u32>>) -> Vec<Vec<u32>>;
    fn vector_inside_array(arg: [Vec<u32>; 1]) -> [Vec<u32>; 1];
    fn vector_inside_enum(arg: EnumWithVector) -> EnumWithVector;
    fn vector_inside_struct(arg: StructWithVector) -> StructWithVector;
    fn array_with_generic_struct(arg: ArrWithGenericStruct<b256>) -> ArrWithGenericStruct<b256>;

    // these are examples for testing signature and selector generation
    fn entry_one(arg: u64) -> u64;
    fn sum(a: u64, b: u64) -> u64;
    fn sum_test(test: Test) -> u64;
    fn takes_array(arg: [str[3]; 3]) -> [str[3]; 2];
    fn take_enum(enum_arg: TestEnum) -> bool;
    fn my_struct(my_u64: u64, my_struct: MyStruct) -> u64;
    fn array_of_structs(arg1: [MyStructWithEnum; 3]) -> str[3];
    fn complex_function(
        arg1: MyGenericStruct<[b256; 3], u8>,
        arg2: [MyGenericStruct<u64, bool>; 4],
        arg3: (str[5], bool),
        arg4: MyOtherStruct,
    );
    #[payable]
    fn send_typed_message_bool(recipient: b256, msg_data: bool, coins: u64);
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
    fn u_8(arg: u8) -> u8 {
        arg
    }
    fn u_16(arg: u16) -> u16 {
        arg
    }
    fn u_32(arg: u32) -> u32 {
        arg
    }
    fn u_64(arg: u64) -> u64 {
        arg
    }
    fn string(arg: str[5]) -> str[5] {
        arg
    }
    fn boolean(arg: bool) -> bool {
        arg
    }
    fn b_256(arg: b256) -> b256 {
        arg
    }
    fn b_512(arg: B512) -> B512 {
        arg
    }
    fn two_args(arg1: b256, arg2: bool) -> (b256, bool) {
        (arg1, arg2)
    }
    fn struct_simple(x: SimpleStruct) -> SimpleStruct {
        x
    }
    fn struct_generic_simple(x: StructB<u8>) -> StructB<u8> {
        x
    }
    fn struct_with_tuple(x: StructB<(bool, u64)>) -> StructB<(bool, u64)> {
        x
    }
    fn tuple_as_param(x: (u8, StructA<StructB<u64>, str[3]>)) -> (u8, StructA<StructB<u64>, str[3]>) {
        x
    }
    fn vector_boolean(x: Vec<bool>) -> Vec<bool> {
        x
    }
    fn vector_u8(x: Vec<u8>) -> Vec<u8> {
        x
    }
    fn enum_simple(x: Color) -> Color {
        x
    }
    fn enum_with_builtin_type(x: EnumWithBuiltinType) -> EnumWithBuiltinType {
        x
    }
    fn enum_with_structs(x: EnumWithStructs) -> EnumWithStructs {
        x
    }
    fn array_simple(x: [u8; 4]) -> [u8; 4] {
        x
    }
    fn array_struct(x: [SimpleStruct; 3]) -> [SimpleStruct; 3] {
        x
    }
    fn option_u8(x: Option<u8>) -> Option<u8> {
        x
    }
    fn arg_then_vector_u8(a: SimpleStruct, x: Vec<u8>) -> (SimpleStruct, Vec<u8>) {
        (a, x)
    }
    fn vector_u8_then_arg(x: Vec<u8>, y: b256) -> (Vec<u8>, b256) {
        (x, y)
    }
    fn struct_with_implicit_generics(
        arg: StructWithImplicitGenerics<b256, u8>,
    ) -> StructWithImplicitGenerics<b256, u8> {
        arg
    }

    fn bytes(arg: Bytes) -> Bytes {
        arg
    }
    fn raw_slice(arg: raw_slice) -> raw_slice {
        arg
    }

    fn dynamic_string(arg: String) -> String {
        arg
    }

    fn asset_id(arg: AssetId) -> AssetId {
        arg
    }

    fn two_u8_vectors(x: Vec<u8>, y: Vec<u8>) -> (Vec<u8>, Vec<u8>) {
        (x, y)
    }
    fn u32_then_three_vectors_u64(
        x: u32,
        y: Vec<u64>,
        z: Vec<u64>,
        q: Vec<u64>,
    ) -> (u32, Vec<u64>, Vec<u64>, Vec<u64>) {
        (x, y, z, q)
    }

    fn return_configurables() -> (u8, bool, [u32; 3], str[4], StructA<u8, bool>) {
        (U8, BOOL, ARRAY, STR_4, STRUCT)
    }
    fn vector_inside_vector(arg: Vec<Vec<u32>>) -> Vec<Vec<u32>> {
        arg
    }
    fn vector_inside_array(arg: [Vec<u32>; 1]) -> [Vec<u32>; 1] {
        arg
    }
    fn vector_inside_enum(arg: EnumWithVector) -> EnumWithVector {
        arg
    }
    fn vector_inside_struct(arg: StructWithVector) -> StructWithVector {
        arg
    }
    fn array_with_generic_struct(arg: ArrWithGenericStruct<b256>) -> ArrWithGenericStruct<b256> {
        arg
    }

    // these are examples for testing signature and selector generation
    fn entry_one(arg: u64) -> u64 {
        arg
    }
    fn sum(a: u64, b: u64) -> u64 {
        a + b
    }
    fn sum_test(test: Test) -> u64 {
        test.foo + test.bar
    }
    fn takes_array(arg: [str[3]; 3]) -> [str[3]; 2] {
        [arg[0], arg[1]]
    }
    fn take_enum(enum_arg: TestEnum) -> bool {
        true
    }
    fn my_struct(my_u64: u64, my_struct: MyStruct) -> u64 {
        my_u64
    }
    fn array_of_structs(arg1: [MyStructWithEnum; 3]) -> str[3] {
        arg1[0].bim
    }
    fn complex_function(
        arg1: MyGenericStruct<[b256; 3], u8>,
        arg2: [MyGenericStruct<u64, bool>; 4],
        arg3: (str[5], bool),
        arg4: MyOtherStruct,
    ) {}
    fn simple_vector(arg: Vec<u8>) -> Vec<u8> {
        arg
    }
    #[payable]
    fn send_typed_message_bool(recipient: b256, msg_data: bool, coins: u64) {
        send_typed_message(recipient, msg_data, coins);
    }
}
