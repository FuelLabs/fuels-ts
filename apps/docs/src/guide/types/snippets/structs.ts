// #region struct-2
type EmployeeDataStruct = {
  name: string;
  age: number;
  salary: number;
  idHash: string;
  ratings: number[];
  isActive: boolean;
};

const data: EmployeeDataStruct = {
  name: 'John Doe',
  age: 30,
  salary: 100_000,
  idHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  ratings: [4, 5, 5],
  isActive: true,
};
// #endregion struct-2

console.log('value', data);
