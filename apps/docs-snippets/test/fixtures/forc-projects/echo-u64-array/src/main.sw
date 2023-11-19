contract;

struct EmployeeData {
    name: str[8],
    age: u8,
    salary: u64,
    idHash: b256,
    ratings: [u8; 3],
    isActive: bool,
}

abi EchoU64Array {
    fn echo_u64_array(u64_array: [u64; 2]) -> [u64; 2];
    fn echo_data(data: EmployeeData) -> EmployeeData;
    fn echo_data_array(data_array: [EmployeeData; 2]) -> [EmployeeData; 2];
}

impl EchoU64Array for Contract {
    // #region arrays-2
    fn echo_u64_array(u64_array: [u64; 2]) -> [u64; 2] {
        u64_array
    }
    // #endregion arrays-2
    fn echo_data(data: EmployeeData) -> EmployeeData {
        data
    }

    fn echo_data_array(data_array: [EmployeeData; 2]) -> [EmployeeData; 2] {
        data_array
    }
}
