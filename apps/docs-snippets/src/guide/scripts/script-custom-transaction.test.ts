import { TestNodeLauncher, AssetId } from '@fuel-ts/test-utils';
import { BN, ScriptTransactionRequest } from 'fuels';
import type { CoinQuantityLike } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';
import { defaultTxParams, getProgramDir } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  const { binHexlified: scriptBin, abiContents } = getSnippetProjectArtifacts(
    SnippetProjectEnum.SCRIPT_TRANSFER_TO_CONTRACT
  );

  it('transfer multiple assets to a contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-values')],
    });
    const {
      contracts: [contract],
      wallets: [wallet],
    } = launched;

    const contractInitialBalanceAssetA = await contract.getBalance(AssetId.A.value);
    const contractInitialBalanceAssetB = await contract.getBalance(AssetId.B.value);

    expect(contractInitialBalanceAssetA).toStrictEqual(new BN(0));
    expect(contractInitialBalanceAssetB).toStrictEqual(new BN(0));

    // #region custom-transactions-2
    // #context import type { BN, CoinQuantityLike, ScriptTransactionRequest } from 'fuels';

    // 1. Create a script transaction using the script binary
    const { minGasPrice, gasPriceFactor } = contract.provider.getGasConfig();

    const request = new ScriptTransactionRequest({
      ...defaultTxParams,
      gasLimit: 3_000_000,
      script: scriptBin,
      gasPrice: minGasPrice,
    });

    // 2. Instantiate the script main arguments
    const scriptArguments = [
      contract.id.toB256(),
      AssetId.A.value,
      new BN(1000),
      AssetId.B.value,
      new BN(500),
    ];

    // 3. Get the resources for inputs and outpoints
    const fee = request.calculateFee(gasPriceFactor);
    const quantities: CoinQuantityLike[] = [[1000, AssetId.A.value], [500, AssetId.B.value], fee];
    const resources = await wallet.getResourcesToSpend(quantities);

    // 4. Populate the script data and inputs/outputs
    request
      .setData(abiContents, scriptArguments)
      .addContractInputAndOutput(contract.id)
      .addResources(resources);

    // 5. Send the transaction
    const tx = await wallet.sendTransaction(request);
    await tx.waitForResult();

    // #endregion custom-transactions-2
    const contractFinalBalanceAssetA = await contract.getBalance(AssetId.A.value);
    const contractFinalBalanceAssetB = await contract.getBalance(AssetId.B.value);

    expect(contractFinalBalanceAssetA).toStrictEqual(new BN(1000));
    expect(contractFinalBalanceAssetB).toStrictEqual(new BN(500));
  });
});
