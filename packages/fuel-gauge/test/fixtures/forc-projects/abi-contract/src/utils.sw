library;

pub fn vec_u32_from(vals: [u32; 3]) -> Vec<u32> {
    let mut vec = Vec::new();
    vec.push(vals[0]);
    vec.push(vals[1]);
    vec.push(vals[2]);
    vec
}

pub fn vec_u8_from(vals: [u8; 3]) -> Vec<u8> {
    let mut vec = Vec::new();
    vec.push(vals[0]);
    vec.push(vals[1]);
    vec.push(vals[2]);
    vec
}

pub fn vec_bool_from(vals: [bool; 4]) -> Vec<bool> {
    let mut vec = Vec::new();
    vec.push(vals[0]);
    vec.push(vals[1]);
    vec.push(vals[2]);
    vec.push(vals[3]);
    vec
}
