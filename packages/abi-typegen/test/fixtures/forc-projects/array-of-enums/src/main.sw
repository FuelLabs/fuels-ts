contract;

enum LettersEnum {
    a: (),
    b: (),
    c: (),
}

enum MyStruct {
    letters: [LettersEnum; 2], // array of enums
}

abi MyContract {
    fn main(x: MyStruct) -> MyStruct;
}

impl MyContract for Contract {
    fn main(x: MyStruct) -> MyStruct {
        x
    }
}
