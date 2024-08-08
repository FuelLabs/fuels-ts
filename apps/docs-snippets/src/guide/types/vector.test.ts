import { BN, arrayify, getRandomB256 } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { BytecodeInputFactory, EchoEmployeeDataVectorFactory } from '../../../test/typegen';
import type { EmployeeDataInput } from '../../../test/typegen/contracts/EchoU64Array';

/**
 * @group node
 * @group browser
 */
describe('Vector Types', () => {
  it('should successfully execute and validate contract call', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoEmployeeDataVectorFactory,
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
    // #context import { EmployeeDataInput } from '../path/to/typegen/contracts/EchoU64Array';

    const employees: EmployeeDataInput[] = [
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
            factory: BytecodeInputFactory,
          },
        ],
      });

      const {
        contracts: [bytecodeContract],
      } = launched;

      // #region vector-bytecode-input-ts
      // #import { BytecodeInputFactory };

      const bytecodeAsVecU8 = arrayify(BytecodeInputFactory.bytecode);

      const { waitForResult } = await bytecodeContract.functions
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
