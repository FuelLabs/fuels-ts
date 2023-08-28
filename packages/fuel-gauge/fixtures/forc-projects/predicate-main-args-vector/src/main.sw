predicate;

fn main(some_vec: Vec<u64>) -> bool {
    some_vec.get(0).unwrap() == 42
}
