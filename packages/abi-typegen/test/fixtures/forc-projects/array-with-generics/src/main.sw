contract;

struct Generic1<T, U> {
    prop1: T,
    prop2: U,
}

struct Generic2<T> {
    prop1: T,
    prop2: [bool; 2],
}

struct MyArrayWithGenerics {
    prop1: [Generic1<Generic2<u64>, str[1]>; 2],
}

abi MyContract {
    fn simple(x: MyArrayWithGenerics) -> u8;
    fn with_generics(x: [Generic1<Generic2<u64>, str[1]>; 2]) -> [Generic1<Generic2<u64>, str[1]>; 2];
}

impl MyContract for Contract {
    fn simple(x: MyArrayWithGenerics) -> u8 {
        1
    }
    fn with_generics(x: [Generic1<Generic2<u64>, str[1]>; 2]) -> [Generic1<Generic2<u64>, str[1]>; 2] {
        x
    }
}
