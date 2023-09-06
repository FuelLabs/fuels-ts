contract;

enum LetterEnum {
    a: (),
    b: (),
    c: (),
}

enum MyEnum {
    letter: LetterEnum, // points to another enum
}

abi MyContract {
    fn main(x: MyEnum) -> MyEnum;
}

impl MyContract for Contract {
    fn main(x: MyEnum) -> MyEnum {
        x
    }
}
