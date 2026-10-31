contract;

// B512 is a 512-bit (64-byte) type from the Sway standard library
use std::b512::B512;

// 1. Creating a B512 from two b256 halves
fn create_b512() -> B512 {
    let hi: b256 = 0xbd0c9b8792876713afa8bff383eebf31c43437823ed761cc3600d0016de5110c;
    let lo: b256 = 0x44ac566bd156b4fc71a4a4cb2655d3dd360c695edb17dc3b64d611e122fea23d;

    let my_b512: B512 = B512::from((hi, lo));
    my_b512
}

// 2. Using B512 as a function parameter
fn echo_b512(value: B512) -> B512 {
    value
}

// 3. Signature verification with B512
use std::ecr::ec_recover_address;

fn verify_signature(signature: B512, msg_hash: b256) -> bool {
    // Recover the signer address from signature
    let result = ec_recover_address(signature, msg_hash);
    result.is_ok()
}