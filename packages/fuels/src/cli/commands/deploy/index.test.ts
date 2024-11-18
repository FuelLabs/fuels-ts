import { Wallet } from '@fuel-ts/account';

import { fuelsConfig } from '../../../../test/fixtures/fuels.config';
import { launchTestNode } from '../../../test-utils';
import type { DeployedData } from '../../types';

import { deploy } from '.';
import * as createWalletMod from './createWallet';
import * as saveContractIdsMod from './saveContractIds';

/**
 * @group node
 */
describe('deploy', () => {
  const mockAll = async () => {
    const onDeploy = vi.fn();

    using launched = await launchTestNode();
    const { provider } = launched;

    const wallet = Wallet.fromPrivateKey('0x01', provider);
    const createWallet = vi.spyOn(createWalletMod, 'createWallet').mockResolvedValue(wallet);

    vi.spyOn(saveContractIdsMod, 'saveContractIds').mockResolvedValue();

    return {
      onDeploy,
      createWallet,
    };
  };

  // TODO: Fix this test
  test.skip('should call onDeploy callback', async () => {
    const { onDeploy } = await mockAll();
    const expectedData: DeployedData = {
      contracts: [],
      scripts: [],
      predicates: [],
    };

    const config = { ...fuelsConfig, contracts: [], scripts: [], predicates: [], onDeploy };

    await deploy(config);

    expect(onDeploy).toHaveBeenCalledWith(config, expectedData);
  });
});
