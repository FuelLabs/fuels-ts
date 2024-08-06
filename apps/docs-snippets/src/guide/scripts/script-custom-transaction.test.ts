import { BN, ScriptTransactionRequest, coinQuantityfy } from 'fuels';
import { ASSET_A, ASSET_B, launchTestNode } from 'fuels/test-utils';

import {
  EchoValuesAbi__factory,
  ScriptTransferToContractAbi__factory,
} from '../../../test/typegen';
import { defaultTxParams } from '../../utils';

/**
 * @group node
 * @group browser
 */
describe('Script Custom Transaction', () => {
  it('transfer multiple assets to a contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [{ factory: EchoValuesAbi__factory }],
    });
    const {
      contracts: [contract],
      wallets: [wallet],
    } = launched;

    const contractInitialBalanceAssetA = await contract.getBalance(ASSET_A);
    const contractInitialBalanceAssetB = await contract.getBalance(ASSET_B);

    expect(contractInitialBalanceAssetA).toStrictEqual(new BN(0));
    expect(contractInitialBalanceAssetB).toStrictEqual(new BN(0));

    // #region custom-transactions-2
    // #import { BN, ScriptTransactionRequest };

    // 1. Create a script transaction using the script binary
    const request = new ScriptTransactionRequest({
      ...defaultTxParams,
      gasLimit: 3_000_000,
      script: ScriptTransferToContractAbi__factory.bin,
    });

    // 2. Instantiate the script main arguments
    const scriptArguments = [
      contract.id.toB256(),
      { bits: ASSET_A },
      new BN(1000),
      { bits: ASSET_B },
      new BN(500),
    ];

    // 3. Populate the script data and add the contract input and output
    request
      .setData(ScriptTransferToContractAbi__factory.abi, scriptArguments)
      .addContractInputAndOutput(contract.id);

    // 4. Get the transaction resources
    const quantities = [coinQuantityfy([1000, ASSET_A]), coinQuantityfy([500, ASSET_B])];

    // 5. Calculate the transaction fee
    const txCost = await wallet.getTransactionCost(request, { quantities });

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await wallet.fund(request, txCost);

    // 6. Send the transaction
    const tx = await wallet.sendTransaction(request);
    await tx.waitForResult();

    // #endregion custom-transactions-2
    const contractFinalBalanceAssetA = await contract.getBalance(ASSET_A);
    const contractFinalBalanceAssetB = await contract.getBalance(ASSET_B);

    expect(contractFinalBalanceAssetA).toStrictEqual(new BN(1000));
    expect(contractFinalBalanceAssetB).toStrictEqual(new BN(500));
  });
});
