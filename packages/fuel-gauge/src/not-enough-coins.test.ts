import { Contract, ErrorCode, Wallet } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';

import { CallTestContractFactory } from '../test/typegen/contracts';

import { launchTestContract } from './utils';

/**
 * @group node
 */
test('not enough coins error', async () => {
  using contract = await launchTestContract({ factory: CallTestContractFactory });

  const emptyWallet = Wallet.generate({ provider: contract.provider });

  const emptyWalletContract = new Contract(contract.id, contract.interface.jsonAbi, emptyWallet);

  await expectToThrowFuelError(() => emptyWalletContract.functions.return_void().call(), {
    code: ErrorCode.NOT_ENOUGH_FUNDS,
    message: 'This account does not have enough funds to cover this transaction.',
  });
});
