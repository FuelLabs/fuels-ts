library;

pub enum InputError {
    PriceCantBeZero: (),
}

pub enum AccessError {
    InvalidTokenId: (),
    TokenIdCantBeZero: (),
}
