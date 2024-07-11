import { toBigInt } from 'ethers';
import { bn } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  test('should successfully create new Sway-compatible BigNumber from a JavaScript number', () => {
    // #region numbers-docs-1
    // #context import { bn } from 'fuels';

    const originalNumber = 20;

    const bigNumber = bn(originalNumber);

    expect(bigNumber.toNumber()).toEqual(originalNumber);
    // #endregion numbers-docs-1
  });

  test('should successfully create new Sway-compatible BigNumber from a string', () => {
    // #region numbers-docs-2
    // #context import { bn } from 'fuels';

    const originalNumber = '9007199254740992';

    const bigNumber = bn(originalNumber);

    expect(bigNumber.toString()).toEqual(originalNumber);
    // #endregion numbers-docs-2
  });

  test('should succcesfully pass in and read a number to/from a contract', async () => {
    const contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_VALUES);

    // #region numbers-docs-3
    const originalNumber = 20;

    const { waitForResult } = await contract.functions.echo_u64(bn(originalNumber)).call();
    const { value } = await waitForResult();

    expect(value.toNumber()).toEqual(originalNumber);
    // #endregion numbers-docs-3
  });

  test('should succcesfully pass in and read a number to/from a contract - small numbers', async () => {
    const contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_VALUES);

    // #region numbers-docs-4
    const originalNumber = 20;

    const { waitForResult } = await contract.functions.echo_u8(originalNumber).call();
    const { value } = await waitForResult();

    expect(value).toEqual(originalNumber);
    // #endregion numbers-docs-4
  });

  test('ethers -> fuels BigNum conversion', () => {
    // #region numbers-docs-5
    // #context import { toBigInt } from 'ethers';
    // #context import { bn } from 'fuels';

    const originalNumber = 20;

    const ethersBigNum = toBigInt(originalNumber);

    const fuelsBigNum = bn(ethersBigNum.toString());

    expect(fuelsBigNum.toNumber()).toEqual(originalNumber);
    // #endregion numbers-docs-5
  });
});
