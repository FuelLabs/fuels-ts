contract;

// #region revert-errors-2
enum Errors {
    InvalidInput: (),
}
// #endregion revert-errors-2

abi MyContract {
    fn test_function() -> bool;

    fn test_function_with_custom_error() -> bool;

    fn test_function_with_str_array_message() -> bool;
}

impl MyContract for Contract {
    // #region revert-errors-1
    fn test_function() -> bool {
        require(false, "This is a revert error");
        true
    }
    // #endregion revert-errors-1

    // #region revert-errors-3
    fn test_function_with_custom_error() -> bool {
        require(false, Errors::InvalidInput);
        true
    }
    // #endregion revert-errors-3

    // #region revert-errors-6
    fn test_function_with_str_array_message() -> bool {
        require(false, __to_str_array("This is also a revert error"));
        true
    }
    // #endregion revert-errors-6
}
