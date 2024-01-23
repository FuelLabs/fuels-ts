contract;

use core::ops::Eq;

pub struct SomeStruct<T> {
    a: T,
}

pub enum SomeEnum<T> {
    a: T,
}

pub fn vec_from(vals: [u32; 3]) -> Vec<u32> {
    let mut vec = Vec::new();
    vec.push(vals[0]);
    vec.push(vals[1]);
    vec.push(vals[2]);
    vec
}

impl Eq for (u32, u32) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1
    }
}

impl Eq for SomeEnum<u32> {
    fn eq(self, other: Self) -> bool {
        match self {
            SomeEnum::a(val) => {
                match other {
                    SomeEnum::a(other_val) => {
                        val == other_val
                    }
                }
            }
        }
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

impl Eq for (Vec<u32>, Vec<u32>) {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1
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

impl Eq for SomeStruct<u32> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}

impl Eq for [Vec<u32>; 2] {
    fn eq(self, other: Self) -> bool {
        let mut i = 0;
        while i < 2 {
            if self[i] != other[i] {
                return false;
            }
            i += 1;
        }
        true
    }
}

impl Eq for Vec<SomeStruct<u32>> {
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

impl Eq for [u64; 2] {
    fn eq(self, other: Self) -> bool {
        let mut i = 0;
        while i < 2 {
            if self[i] != other[i] {
                return false;
            }
            i += 1;
        }
        true
    }
}

impl Eq for Vec<[u64; 2]> {
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

impl Eq for SomeEnum<Vec<u32>> {
    fn eq(self, other: Self) -> bool {
        match self {
            SomeEnum::a(val) => {
                match other {
                    SomeEnum::a(other_val) => {
                        val == other_val
                    }
                }
            }
        }
    }
}

impl Eq for Vec<SomeEnum<u32>> {
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

impl Eq for Vec<(u32, u32)> {
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

impl Eq for SomeStruct<Vec<Vec<u32>>> {
    fn eq(self, other: Self) -> bool {
        self.a == other.a
    }
}

impl Eq for Vec<SomeStruct<Vec<Vec<u32>>>> {
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

abi MyContract {
    fn test_all(
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
    ) -> bool;
}

impl MyContract for Contract {
    fn test_all(
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
        {
            let exp_u32_vec = vec_from([0, 1, 2]);

            require(u32_vec == exp_u32_vec, "u32_vec_error");
        }
        {
            let mut exp_vec_in_vec = Vec::new();
            exp_vec_in_vec.push(vec_from([0, 1, 2]));
            exp_vec_in_vec.push(vec_from([0, 1, 2]));

            require(vec_in_vec == exp_vec_in_vec, "vec_in_vec err");
        }
        {
            let mut exp_struct_in_vec = Vec::new();
            exp_struct_in_vec.push(SomeStruct { a: 0u32 });
            exp_struct_in_vec.push(SomeStruct { a: 1u32 });

            require(struct_in_vec == exp_struct_in_vec, "struct_in_vec err");
        }
        {
            let exp_vec_in_struct = SomeStruct {
                a: vec_from([0, 1, 2]),
            };

            require(vec_in_struct.a == exp_vec_in_struct.a, "vec_in_struct err");
        }
        {
            let mut exp_array_in_vec = Vec::new();
            exp_array_in_vec.push([0, 1]);
            exp_array_in_vec.push([0, 1]);

            require(array_in_vec == exp_array_in_vec, "array_in_vec err");
        }
        {
            let exp_vec_in_array = [vec_from([0, 1, 2]), vec_from([0, 1, 2])];

            require(vec_in_array == exp_vec_in_array, "vec_in_array err");
        }
        {
            let exp_u32_vec = vec_from([0, 1, 2]);
            let exp_vec_in_enum = SomeEnum::a(exp_u32_vec);

            require(vec_in_enum == exp_vec_in_enum, "vec_in_enum err");
        }
        {
            let mut exp_enum_in_vec = Vec::new();
            exp_enum_in_vec.push(SomeEnum::a(0));
            exp_enum_in_vec.push(SomeEnum::a(1));

            require(enum_in_vec == exp_enum_in_vec, "enum_in_vec err");
        }
        {
            let mut exp_tuple_in_vec = Vec::new();
            exp_tuple_in_vec.push((0, 0));
            exp_tuple_in_vec.push((1, 1));

            require(tuple_in_vec == exp_tuple_in_vec, "tuple_in_vec err");
        }
        {
            let exp_vec_in_tuple = (vec_from([0, 1, 2]), vec_from([0, 1, 2]));

            require(vec_in_tuple == exp_vec_in_tuple, "vec_in_tuple err");
        }
        {
            let mut exp_vec_in_a_vec_in_a_struct_in_a_vec = Vec::new();

            let mut inner_vec_1 = Vec::new();

            let inner_inner_vec_1 = vec_from([0, 1, 2]);
            inner_vec_1.push(inner_inner_vec_1);

            let inner_inner_vec_2 = vec_from([3, 4, 5]);
            inner_vec_1.push(inner_inner_vec_2);

            exp_vec_in_a_vec_in_a_struct_in_a_vec.push(SomeStruct { a: inner_vec_1 });

            let mut inner_vec_2 = Vec::new();

            let inner_inner_vec_3 = vec_from([6, 7, 8]);
            inner_vec_2.push(inner_inner_vec_3);

            let inner_inner_vec_4 = vec_from([9, 10, 11]);
            inner_vec_2.push(inner_inner_vec_4);

            exp_vec_in_a_vec_in_a_struct_in_a_vec.push(SomeStruct { a: inner_vec_2 });

            require(
                vec_in_a_vec_in_a_struct_in_a_vec == exp_vec_in_a_vec_in_a_struct_in_a_vec,
                "vec_in_a_vec_in_a_struct_in_a_vec err",
            );
        }

        true
    }
}
