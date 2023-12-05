predicate;

fn main(size: u64) -> bool {
    let mut i = 0;
    let mut result = 0;
    while (i <= size) {
        if (i == size) {
            result = 1;
        }
        i = i + 1;
    }
    return result == 1;
}
