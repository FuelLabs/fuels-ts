import type { Contract } from 'fuels';
import { BN, ContractFactory } from 'fuels';

import { getSnippetProjectArtifacts, SnippetProjectEnum } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abiContents, binHexlified } = getSnippetProjectArtifacts(
      SnippetProjectEnum.ECHO_VALUES
    );

    const factory = new ContractFactory(binHexlified, abiContents, wallet);

    contract = await factory.deployContract();
  });

  it('should successfully echo tuple in a contract call', async () => {
    // #region tuples-1
    // Sway let tuple2: (u8, bool, u64) = (100, false, 10000);
    // #region tuples-3
    const tuple: [number, boolean, number] = [100, false, 10000];
    // #endregion tuples-1

    const { value } = await contract.functions.echo_tuple(tuple).get();

    expect(tuple).toEqual([value[0], value[1], new BN(value[2]).toNumber()]);
    // #endregion tuples-3
  });
});
