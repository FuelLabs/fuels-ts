predicate;

use std::inputs::input_predicate_data;

fn main() -> bool {
    let input: bool = input_predicate_data::<bool>(0).unwrap();
    input == true
}
