predicate;

pub struct SomeStruct<T> {
    a: T,
}

pub enum SomeEnum<T> {
    A: T,
}

fn main(
    u32_vec: Vec<u32>,
    vec_in_vec: Vec<Vec<u32>>,
    struct_in_vec: Vec<SomeStruct<u32>>,
    vec_in_struct: SomeStruct<Vec<u32>>,
    array_in_vec: Vec<[u64; 2]>,
    vec_in_array: [Vec<u32>; 2],
    vec_in_enum: SomeEnum<Vec<u32>>,
    enum_in_vec: Vec<SomeEnum<u32>>,
    tuple_in_vec: Vec<(u32, u32)>,
    vec_in_tuple: (Vec<u32>, Vec<u32>),
    vec_in_a_vec_in_a_struct_in_a_vec: Vec<SomeStruct<Vec<Vec<u32>>>>,
) -> bool {
    let mut result = true;

    result = result && (u32_vec.get(1).unwrap() == 4u32);

    result = result && (vec_in_vec.get(0).unwrap().get(1).unwrap() == 2u32);

    result = result && (struct_in_vec.get(0).unwrap().a == 8u32);

    result = result && (vec_in_struct.a.get(1).unwrap() == 16u32);

    let array: [u64; 2] = array_in_vec.get(1).unwrap();
    result = result && (array[0] == 32u64);

    result = result && (vec_in_array[0].get(1).unwrap() == 64u32);

    if let SomeEnum::A(some_vec) = vec_in_enum {
        result = result && (some_vec.get(2).unwrap() == 128u32);
    } else {
        result = false;
    }

    let enum_a = enum_in_vec.get(1).unwrap();
    if let SomeEnum::A(a) = enum_a {
        result = result && (a == 16u32)
    } else {
        result = false;
    }

    result = result && (tuple_in_vec.get(1).unwrap().0 == 128u32);

    let (tuple_a, tuple_b) = vec_in_tuple;
    result = result && (tuple_a.get(1).unwrap() == 64u32);

    result = result && (vec_in_a_vec_in_a_struct_in_a_vec.get(1).unwrap().a.get(1).unwrap().get(1).unwrap() == 32u32);

    result
}
