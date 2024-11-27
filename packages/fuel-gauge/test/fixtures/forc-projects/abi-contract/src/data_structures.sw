library;

pub struct Configurables {
    pub U8_VALUE: u8,
    pub BOOL_VALUE: bool,
    pub B256_VALUE: b256,
    pub OPTION_U8_VALUE: Option<u8>,
    pub GENERIC_STRUCT_VALUE: StructDoubleGeneric<StructDoubleGeneric<u8, u16>, u32>,
}

pub enum EnumWithNative {
    pub Checked: (),
    pub Pending: (),
}

pub enum EnumWithVector {
    pub a: u8,
    pub b: Vec<u8>,
}

pub enum EnumWithBuiltinType {
    pub a: bool,
    pub b: u64,
}

pub enum EnumDoubleGeneric<T1, T2> {
    pub a: T1,
    pub b: T2,
}

pub enum EnumWithStructs {
    pub a: EnumWithNative,
    pub b: StructSimple,
    pub c: StructDoubleGeneric<u64, StructSimple>,
}

pub struct StructSimple {
    pub a: bool,
    pub b: u32,
}

pub struct StructWithEnumArray {
    pub a: [EnumWithNative; 3],
}

pub struct StructWithMultiOption {
    pub a: [Option<u8>; 5],
}

pub struct StructWithSingleOption {
    pub a: Option<StructWithMultiOption>,
}

pub struct StructWithVector {
    pub a: u8,
    pub b: Vec<u8>,
}

pub struct StructSingleGeneric<T> {
    pub a: T,
}

pub struct StructDoubleGeneric<T1, T2> {
    pub a: T1,
    pub b: T2,
}

pub struct StructGenericWithEnum<T1, T2> {
    pub a: T1,
    pub b: EnumDoubleGeneric<T1, T2>,
}

pub struct StructWithImplicitGenerics<E, F> {
    pub a: [E; 3],
    pub b: (E, F),
}

pub struct StructWithGenericArray<K> {
    pub a: [StructDoubleGeneric<K, u8>; 3],
}

pub struct StructWithNestedArray {
    pub a: [StructDoubleGeneric<StructSingleGeneric<u64>, str[1]>; 2],
}

pub struct StructWithNestedTuple {
    pub a: (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]),
}

pub struct StructWithNestedStruct {
    pub a: StructDoubleGeneric<StructSingleGeneric<u8>, u16>,
}

pub struct StructA {
    pub propA1: u8,
}

pub struct StructB {
    pub propB1: StructA,
    pub propB2: u16,
}

pub struct StructC {
    pub propC1: StructA,
    pub propC2: Vec<StructB>,
    pub propC3: StructD<u8, u8, StructF<str[1]>>,
    // propC4: Vec<StructD<u16, u16, StructF<bool>>>,
    // propC5: Vec<StructD<u32, u32, StructF<Vec<StructG>>>>,
}

pub struct StructD<T, U, V> {
    pub propD1: Vec<StructE<T>>,
    pub propD2: U,
    pub propD3: V,
}

pub struct StructE<T> {
    pub propE1: StructA,
    pub propE2: StructB,
    pub propE3: T,
}

pub struct StructF<T> {
    pub propF1: u64,
    pub propF2: T,
}

pub struct StructG {
    pub propG1: u8,
}

pub enum MyContractError {
    pub DivisionByZero: (),
}

pub type TupleWithNativeAssets = (AssetId, AssetId, bool);
