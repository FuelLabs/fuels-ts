import { readFile } from 'fs/promises';
import type { Contract } from 'fuels';
import { BN, arrayify, getRandomB256 } from 'fuels';
import { join } from 'path';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(
      DocSnippetProjectsEnum.ECHO_EMPLOYEE_DATA_VECTOR
    );
  });

  it('should successfully execute and validate contract call', async () => {
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
      const bytecodeContract = await createAndDeployContractFromProject(
        DocSnippetProjectsEnum.BYTECODE_INPUT
      );
      const bytecodePath = join(
        __dirname,
        '../../../test/fixtures/forc-projects/bytecode-input/out/release/bytecode-input.bin'
      );

      // #region vector-bytecode-input-ts
      // #import { arrayify, readFile };

      const bytecode = await readFile(bytecodePath);
      const bytecodeAsVecU8 = arrayify(bytecode);

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
