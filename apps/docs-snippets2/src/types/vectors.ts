// #region full
import { arrayify, bn, getRandomB256, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import {
  BytecodeInputFactory,
  EchoEmployeeDataVectorFactory,
} from '../typegend';
import type { EmployeeDataInput } from '../typegend/contracts/EchoEmployeeDataVector';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoEmployeeDataVectorFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();
const deploy2 = await BytecodeInputFactory.deploy(wallet);
const { contract: bytecodeContract } = await deploy2.waitForResult();

// #region vector-1
// Sway Vec<u8>
const basicU8Vector = [1, 2, 3];
// #endregion vector-1

// #region vector-4
const employees: EmployeeDataInput[] = [
  {
    name: 'John Doe',
    age: 30,
    salary: bn(8000),
    idHash: getRandomB256(),
    ratings: [1, 2, 3],
    isActive: true,
  },
  {
    name: 'Everyman',
    age: 31,
    salary: bn(9000),
    idHash: getRandomB256(),
    ratings: [5, 6, 7],
    isActive: true,
  },
];
const { value } = await contract.functions
  .echo_last_employee_data(employees)
  .simulate();
// #endregion vector-4

// #region vector-bytecode-input-ts
const bytecodeAsVecU8 = Array.from(arrayify(BytecodeInputFactory.bytecode));

const { waitForResult } = await bytecodeContract.functions
  .compute_bytecode_root(bytecodeAsVecU8)
  .call();

const { value: bytecodeRoot } = await waitForResult();
// #endregion vector-bytecode-input-ts
// #endregion full

console.log(
  'equals',
  JSON.stringify(basicU8Vector) === JSON.stringify([1, 2, 3])
);
console.log('equals', JSON.stringify(value) === JSON.stringify(employees[1]));
console.log(
  'equals',
  bytecodeRoot ===
    '0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
);
