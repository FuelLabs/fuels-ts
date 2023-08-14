import type { Contract } from 'fuels';
import { Wallet } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(SnippetProjectEnum.ECHO_VALUES);
  });

  it('should successfully call contract function and validate b512', async () => {
    // #region bits512-1
    // #context pub struct B512 {
    // #context   bytes: [b256; 2],
    // #context }
    // #endregion bits512-1

    // #region bits512-2
    // #context import {  Wallet } from 'fuels';

    const wallet = Wallet.generate();

    // #context console.log(walllet.publicKey);

    // #context > 0x97e3a666e4cd34b6b3cf778ef5ec617de4439b68f7a629245442a1fece7713094a1cb0aa7ad0ac253ca1ea47d4618f9090b2a881e829e091fb2c426763e94cca
    // #endregion bits512-2
    // #region bits512-4
    const b512 = wallet.publicKey;

    const { value } = await contract.functions.echo_b512(b512).simulate();

    expect(value).toEqual(b512);
    // #endregion bits512-4
  });
});
