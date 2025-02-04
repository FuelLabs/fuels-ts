contract;

// #region enums-1
// #region enums-4
pub enum StateError {
    Void: (),
    Pending: (),
    Completed: (),
}
// #endregion enums-1

pub enum UserError {
    Unauthorized: (),
    InsufficientPermissions: (),
}

pub enum Error {
    StateError: StateError,
    UserError: UserError,
}
// #endregion enums-4

abi EchoEnum {
    fn echo_state_error_enum(state_error: StateError) -> StateError;

    fn echo_user_error_enum(state_error: UserError) -> UserError;

    fn echo_error_enum(error: Error) -> Error;
}

impl EchoEnum for Contract {
    // #region enums-2
    fn echo_state_error_enum(state_error: StateError) -> StateError {
        state_error
    }
    // #endregion enums-2
    fn echo_user_error_enum(user_error: UserError) -> UserError {
        user_error
    }

    // #region enums-5
    fn echo_error_enum(error: Error) -> Error {
        error
    }
    // #endregion enums-5
}
