import { Contract, ErrorCode, ScriptTransactionRequest, Wallet } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import { CallTestContractFactory } from '../test/typegen/contracts';

import { launchTestContract } from './utils';

/**
 * @group node
 * @group browser
 */
describe('mapped error messages', () => {
  test('not enough coins error', async () => {
    using contract = await launchTestContract({ factory: CallTestContractFactory });

    const emptyWallet = Wallet.generate({ provider: contract.provider });

    const emptyWalletContract = new Contract(contract.id, contract.interface.jsonAbi, emptyWallet);

    await expectToThrowFuelError(() => emptyWalletContract.functions.return_void().call(), {
      code: ErrorCode.NOT_ENOUGH_FUNDS,
      message: `The account(s) sending the transaction don't have enough funds to cover the transaction.`,
    });
  });

  test('max coins reached error', async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        amountPerCoin: 1,
        coinsPerAsset: 256,
      },
    });
    const {
      wallets: [wallet],
    } = launched;

    const request = new ScriptTransactionRequest();
    request.addCoinOutput(wallet.address, 256, wallet.provider.getBaseAssetId());
    const txCost = await wallet.getTransactionCost(request);

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await expectToThrowFuelError(() => wallet.fund(request, txCost), {
      code: ErrorCode.MAX_COINS_REACHED,
      message:
        'The account retrieving coins has exceeded the maximum number of coins per asset. Please consider combining your coins into a single UTXO.',
    });
  });
});
