import type { Contract } from 'fuels';
import { BN, getRandomB256, ContractFactory } from 'fuels';

import { getSnippetContractArtifacts, SnippetProjectEnum } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abi, bin } = getSnippetContractArtifacts(SnippetProjectEnum.ECHO_EMPLOYEE_DATA_VECTOR);

    const factory = new ContractFactory(bin, abi, wallet);

    contract = await factory.deployContract();
  });

  it('should successfully execute and validate contract call', async () => {
    // #region vector-1
    // Sway Vec<u8>
    // #context const basicU8Vector = [1, 2, 3];
    // #endregion vector-1

    // #region vector-4
    // #context import { BN, getRandomB256 } from 'fuels';

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
        ratings: [1, 2, 3],
        isActive: false,
      },
    ];
    const { value } = await contract.functions.echo_last_employee_data(employees).get();
    // #endregion vector-4

    expect(value.name).toEqual(employees[1].name);
    expect(value.age).toEqual(employees[1].age);
    expect(new BN(value.salary).toNumber()).toEqual(employees[1].salary);
    expect(value.idHash).toEqual(employees[1].idHash);
    expect(value.ratings).toEqual(employees[1].ratings);
    expect(value.isActive).toEqual(employees[1].isActive);
  });
});
