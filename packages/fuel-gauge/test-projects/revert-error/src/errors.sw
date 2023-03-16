library errors;

pub enum InputError {
    PriceCantBeZero: (),
}

pub enum AccessError {
    InvalidTokenId: (),
    TokenIdCantBeZero: ()
}
