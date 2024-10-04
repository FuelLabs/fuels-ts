library;

use ::data_structures::*;
use core::ops::Eq;

impl Eq for [u8; 4] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] &&
          self[1] == other[1] &&
          self[2] == other[2] &&
          self[3] == other[3]
    }
}

impl Eq for StructSimple {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}

impl Eq for [StructSimple; 3] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1] && self[2] == other[2]
    }
}

impl Eq for StructSingleGeneric<u64> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}

impl Eq for str[1] {
    fn eq(self, other: Self) -> bool {
        // @TODO work out how to equal str[1]
        // self[0] == other[0]
        true
    }
}

impl Eq for str[3] {
    fn eq(self, other: Self) -> bool {
        // @TODO work out how to equal str[3]
        // self[0] == other[0] && self[1] == other[1] && self[2] == other[2]
        true
    }
}

impl Eq for StructDoubleGeneric<StructSingleGeneric<u64>, str[1]> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}

impl Eq for StructDoubleGeneric<b256, u8> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}

impl Eq for [StructDoubleGeneric<b256, u8>; 3] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1] && self[2] == other[2]
    }
}

impl Eq for [StructDoubleGeneric<StructSingleGeneric<u64>, str[1]>; 2] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1]
    }
}

impl Eq for Vec<u32> {
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

impl Eq for [Vec<u32>; 1] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0]
    }
}

impl Eq for (u8, u8, u8) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1 && self.2 == other.2
    }
}

impl Eq for StructSingleGeneric<StructSingleGeneric<u64>> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}

impl Eq for (u8, StructSingleGeneric<StructSingleGeneric<u64>>, str[3]) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1 && self.2 == other.2
    }
}

impl Eq for (AssetId, AssetId, bool) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1 && self.2 == other.2
    }
}

impl Eq for StructSingleGeneric<u8> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}

impl Eq for (bool, u64) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1
    }
}

impl Eq for StructSingleGeneric<(bool, u64)> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}

impl Eq for StructWithNestedArray {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}

impl Eq for EnumDoubleGeneric<u8, u16> {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (EnumDoubleGeneric::a(a), EnumDoubleGeneric::a(b)) => a == b,
            (EnumDoubleGeneric::b(a), EnumDoubleGeneric::b(b)) => a == b,
            _ => false,
        }
    }
}

impl Eq for StructGenericWithEnum<u8, u16> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}

impl Eq for StructWithNestedTuple {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}

impl Eq for StructDoubleGeneric<StructSingleGeneric<u8>, u16> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}

impl Eq for StructWithNestedStruct {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}

impl Eq for StructA {
    fn eq(self, other: Self) -> bool {
        self.propA1 == other.propA1
    }
}

impl Eq for StructB {
    fn eq(self, other: Self) -> bool {
        self.propB1 == other.propB1 && self.propB2 == other.propB2
    }
}

impl Eq for StructE<u8> {
    fn eq(self, other: Self) -> bool {
        self.propE1 == other.propE1 && self.propE2 == other.propE2 && self.propE3 == other.propE3
    }
}

impl Eq for Vec<StructE<u8>> {
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

impl Eq for StructF<str[1]> {
    fn eq(self, other: Self) -> bool {
        self.propF1 == other.propF1 && self.propF2 == other.propF2
    }
}

impl Eq for StructD<u8, u8, StructF<str[1]>> {
    fn eq(self, other: Self) -> bool {
        self.propD1 == other.propD1 && self.propD2 == other.propD2 && self.propD3 == other.propD3
    }
}

impl Eq for Vec<StructB> {
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

impl Eq for StructC {
    fn eq(self, other: Self) -> bool {
        self.propC1 == other.propC1 && self.propC2 == other.propC2 && self.propC3 == other.propC3
    }
}

impl Eq for EnumWithNative {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (EnumWithNative::Checked, EnumWithNative::Checked) => true,
            (EnumWithNative::Pending, EnumWithNative::Pending) => true,
            _ => false,
        }
    }
}

impl Eq for EnumWithBuiltinType {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (EnumWithBuiltinType::a(a), EnumWithBuiltinType::a(b)) => a == b,
            (EnumWithBuiltinType::b(a), EnumWithBuiltinType::b(b)) => a == b,
            _ => false,
        }
    }
}

impl Eq for Vec<u8> {
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

impl Eq for EnumWithVector {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (EnumWithVector::a(a), EnumWithVector::a(b)) => a == b,
            (EnumWithVector::b(a), EnumWithVector::b(b)) => a == b,
            _ => false,
        }
    }
}

impl Eq for StructDoubleGeneric<u64, StructSimple> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}

impl Eq for EnumWithStructs {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (EnumWithStructs::a(a), EnumWithStructs::a(b)) => a == b,
            (EnumWithStructs::b(a), EnumWithStructs::b(b)) => a == b,
            (EnumWithStructs::c(a), EnumWithStructs::c(b)) => a == b,
            _ => false,
        }
    }
}

impl Eq for Vec<bool> {
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

impl Eq for Vec<Vec<u32>> {
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

impl Eq for Vec<StructSimple> {
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

impl Eq for [Option<u8>; 5] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] &&
          self[1] == other[1] &&
          self[2] == other[2] &&
          self[3] == other[3] &&
          self[4] == other[4]
    }
}

impl Eq for StructWithMultiOption {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}


impl Eq for Vec<StructWithMultiOption> {
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

impl Eq for StructWithGenericArray<b256> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}

impl Eq for [b256; 3] {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1] && self[2] == other[2]
    }
}

impl Eq for (b256, u8) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1
    }
}

impl Eq for StructWithImplicitGenerics<b256, u8> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a && self.b == other.b
    }
}
