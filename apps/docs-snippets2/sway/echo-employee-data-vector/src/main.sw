contract;

use std::vec::Vec;
use employee_data::EmployeeData;

abi EchoEmployeeDataVector {
    fn echo_last_employee_data(employee_data_vector: Vec<EmployeeData>) -> EmployeeData;
}

impl EchoEmployeeDataVector for Contract {
    // #region vector-3
    fn echo_last_employee_data(employee_data_vector: Vec<EmployeeData>) -> EmployeeData {
        employee_data_vector.get(employee_data_vector.len() - 1).unwrap()
    }
    // #endregion vector-3
}
