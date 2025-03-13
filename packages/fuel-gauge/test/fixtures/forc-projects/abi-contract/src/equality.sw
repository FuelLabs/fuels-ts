library;

use core::ops::Eq;
use ::data_structures::*;

impl PartialEq for [u8; 4] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1] && self[2] == other[2] && self[3] == other[3]
    }
}
impl Eq for [u8; 4] {}

impl PartialEq for StructSimple {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}
impl Eq for StructSimple {}

impl PartialEq for [StructSimple; 3] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1] && self[2] == other[2]
    }
}
impl Eq for [StructSimple; 3] {}

impl PartialEq for StructSingleGeneric<u64> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructSingleGeneric<u64> {}

impl PartialEq for [b256; 3] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1] && self[2] == other[2]
    }
}
impl Eq for [b256; 3] {}

impl PartialEq for (b256, u8) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1
    }
}
impl Eq for (b256, u8) {}

impl PartialEq for str[1] {
    fn eq(self, other: Self) -> bool {
        from_str_array(self) == from_str_array(other)
    }
}
impl Eq for str[1] {}

impl PartialEq for str[3] {
    fn eq(self, other: Self) -> bool {
        from_str_array(self) == from_str_array(other)
    }
}
impl Eq for str[3] {}

impl PartialEq for str[5] {
    fn eq(self, other: Self) -> bool {
        from_str_array(self) == from_str_array(other)
    }
}
impl Eq for str[5] {}

impl PartialEq for StructDoubleGeneric<StructSingleGeneric<u64>, str[1]> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}
impl Eq for StructDoubleGeneric<StructSingleGeneric<u64>, str[1]> {}

impl PartialEq for StructDoubleGeneric<b256, u8> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}
impl Eq for StructDoubleGeneric<b256, u8> {}

impl PartialEq for StructDoubleGeneric<u64, bool> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructDoubleGeneric<u64, bool> {}

impl PartialEq for [StructDoubleGeneric<b256, u8>; 3] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1] && self[2] == other[2]
    }
}
impl Eq for [StructDoubleGeneric<b256, u8>; 3] {}

impl PartialEq for [StructDoubleGeneric<StructSingleGeneric<u64>, str[1]>; 2] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1]
    }
}
impl Eq for [StructDoubleGeneric<StructSingleGeneric<u64>, str[1]>; 2] {}

impl PartialEq for [StructDoubleGeneric<u64, bool>; 4] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1] && self[2] == other[2] && self[3] == other[3]
    }
}
impl Eq for [StructDoubleGeneric<u64, bool>; 4] {}

impl PartialEq for StructSingleGeneric<[b256; 3]> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructSingleGeneric<[b256; 3]> {}

impl PartialEq for StructDoubleGeneric<[b256; 3], u8> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructDoubleGeneric<[b256; 3], u8> {}

impl PartialEq for StructDoubleGeneric<StructSingleGeneric<[b256; 3]>, u8> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}
impl Eq for StructDoubleGeneric<StructSingleGeneric<[b256; 3]>, u8> {}

impl PartialEq for Vec<u32> {
    fn eq(self, other: Self) -> bool {
        if self.len() != other.len() {
            return false;
        }
        let mut i = 0;
        while i < self.len() {
            if self.get(i).unwrap() != other.get(i).unwrap() {
                return false;
            }
            i += 1;
        }
        true
    }
}
impl Eq for Vec<u32> {}

impl PartialEq for Vec<u64> {
    fn eq(self, other: Self) -> bool {
        if self.len() != other.len() {
            return false;
        }
        let mut i = 0;
        while i < self.len() {
            if self.get(i).unwrap() != other.get(i).unwrap() {
                return false;
            }
            i += 1;
        }
        true
    }
}
impl Eq for Vec<u64> {}

impl PartialEq for [Vec<u32>; 1] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0]
    }
}
impl Eq for [Vec<u32>; 1] {}

impl PartialEq for (u8, u8, u8) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1 && self.2 == other.2
    }
}
impl Eq for (u8, u8, u8) {}

impl PartialEq for StructSingleGeneric<StructSingleGeneric<u64>> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructSingleGeneric<StructSingleGeneric<u64>> {}

impl PartialEq for (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1 && self.2 == other.2
    }
}
impl Eq for (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]) {}

impl PartialEq for (AssetId, AssetId, bool) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1 && self.2 == other.2
    }
}
impl Eq for (AssetId, AssetId, bool) {}

impl PartialEq for StructSingleGeneric<u8> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructSingleGeneric<u8> {}

impl PartialEq for (bool, u64) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1
    }
}
impl Eq for (bool, u64) {}

impl PartialEq for (str[5], bool) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1
    }
}
impl Eq for (str[5], bool) {}

impl PartialEq for StructSingleGeneric<(bool, u64)> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructSingleGeneric<(bool, u64)> {}

impl PartialEq for StructWithNestedArray {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructWithNestedArray {}

impl PartialEq for EnumDoubleGeneric<u8, u16> {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (EnumDoubleGeneric::a(a), EnumDoubleGeneric::a(b)) => a == b,
            (EnumDoubleGeneric::b(a), EnumDoubleGeneric::b(b)) => a == b,
            _ => false,
        }
    }
}
impl Eq for EnumDoubleGeneric<u8, u16> {}

impl PartialEq for StructGenericWithEnum<u8, u16> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}
impl Eq for StructGenericWithEnum<u8, u16> {}

impl PartialEq for StructWithNestedTuple {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructWithNestedTuple {}

impl PartialEq for StructDoubleGeneric<StructSingleGeneric<u8>, u16> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}
impl Eq for StructDoubleGeneric<StructSingleGeneric<u8>, u16> {}

impl PartialEq for StructWithNestedStruct {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructWithNestedStruct {}

impl PartialEq for StructA {
    fn eq(self, other: Self) -> bool {
        self.propA1 == other.propA1
    }
}
impl Eq for StructA {}

impl PartialEq for StructB {
    fn eq(self, other: Self) -> bool {
        self.propB1 == other.propB1 && self.propB2 == other.propB2
    }
}
impl Eq for StructB {}

impl PartialEq for StructE<u8> {
    fn eq(self, other: Self) -> bool {
        self.propE1 == other.propE1 && self.propE2 == other.propE2 && self.propE3 == other.propE3
    }
}
impl Eq for StructE<u8> {}

impl PartialEq for Vec<StructE<u8>> {
    fn eq(self, other: Self) -> bool {
        if self.len() != other.len() {
            return false;
        }
        let mut i = 0;
        while i < self.len() {
            if self.get(i).unwrap() != other.get(i).unwrap() {
                return false;
            }
            i += 1;
        }
        true
    }
}
impl Eq for Vec<StructE<u8>> {}

impl PartialEq for StructF<str[1]> {
    fn eq(self, other: Self) -> bool {
        self.propF1 == other.propF1 && self.propF2 == other.propF2
    }
}
impl Eq for StructF<str[1]> {}

impl PartialEq for StructD<u8, u8, StructF<str[1]>> {
    fn eq(self, other: Self) -> bool {
        self.propD1 == other.propD1 && self.propD2 == other.propD2 && self.propD3 == other.propD3
    }
}
impl Eq for StructD<u8, u8, StructF<str[1]>> {}

impl PartialEq for Vec<StructB> {
    fn eq(self, other: Self) -> bool {
        if self.len() != other.len() {
            return false;
        }
        let mut i = 0;
        while i < self.len() {
            if self.get(i).unwrap() != other.get(i).unwrap() {
                return false;
            }
            i += 1;
        }
        true
    }
}
impl Eq for Vec<StructB> {}

impl PartialEq for StructC {
    fn eq(self, other: Self) -> bool {
        self.propC1 == other.propC1 && self.propC2 == other.propC2 && self.propC3 == other.propC3
    }
}
impl Eq for StructC {}

impl PartialEq for EnumWithNative {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (EnumWithNative::Checked, EnumWithNative::Checked) => true,
            (EnumWithNative::Pending, EnumWithNative::Pending) => true,
            _ => false,
        }
    }
}
impl Eq for EnumWithNative {}

impl PartialEq for EnumWithBuiltinType {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (EnumWithBuiltinType::a(a), EnumWithBuiltinType::a(b)) => a == b,
            (EnumWithBuiltinType::b(a), EnumWithBuiltinType::b(b)) => a == b,
            _ => false,
        }
    }
}
impl Eq for EnumWithBuiltinType {}

impl PartialEq for Vec<u8> {
    fn eq(self, other: Self) -> bool {
        if self.len() != other.len() {
            return false;
        }
        let mut i = 0;
        while i < self.len() {
            if self.get(i).unwrap() != other.get(i).unwrap() {
                return false;
            }
            i += 1;
        }
        true
    }
}
impl Eq for Vec<u8> {}

impl PartialEq for EnumWithVector {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (EnumWithVector::a(a), EnumWithVector::a(b)) => a == b,
            (EnumWithVector::b(a), EnumWithVector::b(b)) => a == b,
            _ => false,
        }
    }
}
impl Eq for EnumWithVector {}

impl PartialEq for StructDoubleGeneric<u64, StructSimple> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}
impl Eq for StructDoubleGeneric<u64, StructSimple> {}

impl PartialEq for EnumWithStructs {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (EnumWithStructs::a(a), EnumWithStructs::a(b)) => a == b,
            (EnumWithStructs::b(a), EnumWithStructs::b(b)) => a == b,
            (EnumWithStructs::c(a), EnumWithStructs::c(b)) => a == b,
            _ => false,
        }
    }
}
impl Eq for EnumWithStructs {}

impl PartialEq for Vec<bool> {
    fn eq(self, other: Self) -> bool {
        if self.len() != other.len() {
            return false;
        }
        let mut i = 0;
        while i < self.len() {
            if self.get(i).unwrap() != other.get(i).unwrap() {
                return false;
            }
            i += 1;
        }
        true
    }
}
impl Eq for Vec<bool> {}

impl PartialEq for Vec<Vec<u32>> {
    fn eq(self, other: Self) -> bool {
        if self.len() != other.len() {
            return false;
        }
        let mut i = 0;
        while i < self.len() {
            if self.get(i).unwrap() != other.get(i).unwrap() {
                return false;
            }
            i += 1;
        }
        true
    }
}
impl Eq for Vec<Vec<u32>> {}

impl PartialEq for Vec<StructSimple> {
    fn eq(self, other: Self) -> bool {
        if self.len() != other.len() {
            return false;
        }
        let mut i = 0;
        while i < self.len() {
            if self.get(i).unwrap() != other.get(i).unwrap() {
                return false;
            }
            i += 1;
        }
        true
    }
}
impl Eq for Vec<StructSimple> {}

impl PartialEq for [Option<u8>; 5] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1] && self[2] == other[2] && self[3] == other[3] && self[4] == other[4]
    }
}
impl Eq for [Option<u8>; 5] {}

impl PartialEq for StructWithMultiOption {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructWithMultiOption {}

impl PartialEq for Vec<StructWithMultiOption> {
    fn eq(self, other: Self) -> bool {
        if self.len() != other.len() {
            return false;
        }
        let mut i = 0;
        while i < self.len() {
            if self.get(i).unwrap() != other.get(i).unwrap() {
                return false;
            }
            i += 1;
        }
        true
    }
}
impl Eq for Vec<StructWithMultiOption> {}

impl PartialEq for StructWithGenericArray<b256> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructWithGenericArray<b256> {}

impl PartialEq for StructWithImplicitGenerics<b256, u8> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}
impl Eq for StructWithImplicitGenerics<b256, u8> {}

impl PartialEq for StructWithVector {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}
impl Eq for StructWithVector {}

impl PartialEq for [EnumWithNative; 3] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1] && self[2] == other[2]
    }
}
impl Eq for [EnumWithNative; 3] {}

impl PartialEq for StructWithEnumArray {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructWithEnumArray {}

impl PartialEq for StructWithSingleOption {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}
impl Eq for StructWithSingleOption {}
