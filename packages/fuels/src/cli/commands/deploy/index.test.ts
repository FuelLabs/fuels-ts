import type { Provider } from '@fuel-ts/account';
import { Wallet } from '@fuel-ts/account';
import { FUEL_NETWORK_URL } from '@fuel-ts/account/configs';

import { fuelsConfig } from '../../../../test/fixtures/fuels.config';
import { mockLogger } from '../../../../test/utils/mockLogger';
import type { DeployedContract } from '../../types';

import { deploy } from '.';
import * as createWalletMod from './createWallet';
import * as saveContractIdsMod from './saveContractIds';

/**
 * @group node
 */
describe('deploy', () => {
  const mockAll = () => {
    const { debug } = mockLogger();

    const onDeploy = vi.fn();

    const provider = { url: FUEL_NETWORK_URL } as Provider;
    const wallet = Wallet.fromPrivateKey('0x01', provider);
    const createWallet = vi.spyOn(createWalletMod, 'createWallet').mockResolvedValue(wallet);

    vi.spyOn(saveContractIdsMod, 'saveContractIds').mockResolvedValue();

    return {
      onDeploy,
      createWallet,
    };
  };

  test('should call onDeploy callback', async () => {
    const { onDeploy } = mockAll();
    const expectedContracts: DeployedContract[] = [];
    const config = { ...fuelsConfig, contracts: [], onDeploy };

    await deploy(config);

    expect(onDeploy).toHaveBeenCalledWith(expectedContracts, config);
  });
});
