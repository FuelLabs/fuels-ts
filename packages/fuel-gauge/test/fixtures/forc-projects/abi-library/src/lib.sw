library;

// anything `pub` here will be exported as a part of this library's API
pub struct ExternalStruct {
    pub value: u64,
}

pub enum ExternalEnum {
    A: (),
    B: (),
}

impl Eq for ExternalStruct {
    fn eq(self, other: Self) -> bool {
        self.value == other.value
    }
}