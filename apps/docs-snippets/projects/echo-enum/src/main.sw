contract;

// #region enum-1
// #region enum-4
pub enum StateError {
    Void: (),
    Pending: (),
    Completed: (),
}
// #endregion enum-1

pub enum UserError {
    Unauthorized: (),
    InsufficientPermissions: (),
}

pub enum Error {
    StateError: StateError,
    UserError: UserError,
}
// #endregion enum-4

abi EchoEnum {
    fn echo_state_error_enum(state_error: StateError) -> StateError;

    fn echo_user_error_enum(state_error: UserError) -> UserError;

    fn echo_error_enum(error: Error) -> Error;
}

impl EchoEnum for Contract {
    // #region enum-2
    fn echo_state_error_enum(state_error: StateError) -> StateError {
        state_error
    }
    // #endregion enum-2

    fn echo_user_error_enum(user_error: UserError) -> UserError {
        user_error
    }

    // #region enum-5
    fn echo_error_enum(error: Error) -> Error {
        error
    }
    // #endregion enum-5
}
