// #region send-and-spend-funds-from-predicates-1
predicate;

fn main(input_address: b256) -> bool {
    let valid_address = 0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4;

    input_address == valid_address
}
// #endregion send-and-spend-funds-from-predicates-1
