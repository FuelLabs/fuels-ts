import { BN, arrayify, getRandomB256 } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  BytecodeInputAbi__factory,
  EchoEmployeeDataVectorAbi__factory,
} from '../../../test/typegen';
import BytecodeInputAbiHex from '../../../test/typegen/contracts/BytecodeInputAbi.hex';
import EchoEmployeeDataVectorAbiHex from '../../../test/typegen/contracts/EchoEmployeeDataVectorAbi.hex';

/**
 * @group node
 * @group browser
 */
describe(__filename, () => {
  it('should successfully execute and validate contract call', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: EchoEmployeeDataVectorAbi__factory,
          bytecode: EchoEmployeeDataVectorAbiHex,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region vector-1
    // Sway Vec<u8>
    // #context const basicU8Vector = [1, 2, 3];
    // #endregion vector-1

    // #region vector-4
    // #import { getRandomB256 };

    const employees = [
      {
        name: 'John Doe',
        age: 30,
        salary: 8000,
        idHash: getRandomB256(),
        ratings: [1, 2, 3],
        isActive: true,
      },
      {
        name: 'Everyman',
        age: 31,
        salary: 9000,
        idHash: getRandomB256(),
        ratings: [5, 6, 7],
        isActive: true,
      },
    ];
    const { value } = await contract.functions.echo_last_employee_data(employees).simulate();
    // #endregion vector-4
    expect(value.name).toEqual(employees[1].name);
    expect(value.age).toEqual(employees[1].age);
    expect(new BN(value.salary).toNumber()).toEqual(employees[1].salary);
    expect(value.idHash).toEqual(employees[1].idHash);
    expect(value.ratings).toEqual(employees[1].ratings);
    expect(value.isActive).toEqual(employees[1].isActive);
  });

  it(
    'should successfully execute a contract call with a bytecode input',
    async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          {
            deployer: BytecodeInputAbi__factory,
            bytecode: BytecodeInputAbiHex,
          },
        ],
      });

      const {
        contracts: [bytecodeContract],
      } = launched;

      // #region vector-bytecode-input-ts
      // #import { BytecodeInputAbiHex };

      const bytecodeAsVecU8 = arrayify(BytecodeInputAbiHex);

      const { waitForResult } = await bytecodeContract.functions
        // #TODO: Not assignable to type BigNumberish
        .compute_bytecode_root(bytecodeAsVecU8)
        .call();

      const { value: bytecodeRoot } = await waitForResult();
      // #endregion vector-bytecode-input-ts

      expect(bytecodeRoot).toBeDefined();
      expect(bytecodeRoot.length).toBe(66);
    },
    { timeout: 10000 }
  );
});
