library;

// anything `pub` here will be exported as a part of this library's API
pub struct ExternalStruct {
    pub value: u64,
}

pub enum ExternalEnum {
    A: (),
    B: (),
}

impl PartialEq for ExternalStruct {
    fn eq(self, other: Self) -> bool {
        self.value == other.value
    }
}
impl Eq for ExternalStruct {}

impl PartialEq for ExternalEnum {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (ExternalEnum::A, ExternalEnum::A) => true,
            (ExternalEnum::B, ExternalEnum::B) => true,
            _ => false,
        }
    }
}
impl Eq for ExternalEnum {}
