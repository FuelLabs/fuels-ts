library auth_testing_abi;

abi AuthTesting {
    fn is_caller_external() -> bool;
    fn check_msg_sender(expected_id: Address) -> bool;
}