import { BN, ContractFactory, BaseAssetId, ScriptTransactionRequest } from 'fuels';
import type { CoinQuantityLike, Contract, WalletUnlocked, Provider } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { defaultTxParams, getTestWallet } from '../../utils';

describe(__filename, () => {
  let wallet: WalletUnlocked;
  let provider: Provider;
  let contract: Contract;

  const assetIdB = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const assetIdA = '0x0202020202020202020202020202020202020202020202020202020202020202';

  const { binHexlified: scriptBin, abiContents } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SCRIPT_TRANSFER_TO_CONTRACT
  );

  const { abiContents: contractAbi, binHexlified: contractBin } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.ECHO_VALUES
  );

  beforeAll(async () => {
    const seedQuantities: CoinQuantityLike[] = [
      [1000, assetIdA],
      [500, assetIdB],
      [300_000, BaseAssetId],
    ];

    wallet = await getTestWallet(seedQuantities);
    provider = wallet.provider;
    const factory = new ContractFactory(contractBin, contractAbi, wallet);
    const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();
    contract = await factory.deployContract({ gasPrice });
  });

  it('transfer multiple assets to a contract', async () => {
    const contractInitialBalanceAssetA = await contract.getBalance(assetIdA);
    const contractInitialBalanceAssetB = await contract.getBalance(assetIdB);

    expect(contractInitialBalanceAssetA).toStrictEqual(new BN(0));
    expect(contractInitialBalanceAssetB).toStrictEqual(new BN(0));

    // #region custom-transactions-2
    // #context import type { BN, CoinQuantityLike, ScriptTransactionRequest } from 'fuels';

    // 1. Create a script transaction using the script binary
    const { minGasPrice } = contract.provider.getGasConfig();

    const request = new ScriptTransactionRequest({
      ...defaultTxParams,
      gasLimit: 3_000_000,
      script: scriptBin,
      gasPrice: minGasPrice,
    });

    // 2. Instantiate the script main arguments
    const scriptArguments = [
      contract.id.toB256(),
      { value: assetIdA },
      new BN(1000),
      { value: assetIdB },
      new BN(500),
    ];

    // 3. Populate the script data and add the contract input and output
    request.setData(abiContents, scriptArguments).addContractInputAndOutput(contract.id);

    // 4. Calculate the transaction fee
    const { maxFee } = await provider.getTransactionCost(request);

    // 5. Get the transaction resources
    const quantities: CoinQuantityLike[] = [
      [1000, assetIdA],
      [500, assetIdB],
      [maxFee, BaseAssetId],
    ];

    const resources = await wallet.getResourcesToSpend(quantities);

    request.addResources(resources);

    // 6. Send the transaction
    const tx = await wallet.sendTransaction(request);
    await tx.waitForResult();

    // #endregion custom-transactions-2
    const contractFinalBalanceAssetA = await contract.getBalance(assetIdA);
    const contractFinalBalanceAssetB = await contract.getBalance(assetIdB);

    expect(contractFinalBalanceAssetA).toStrictEqual(new BN(1000));
    expect(contractFinalBalanceAssetB).toStrictEqual(new BN(500));
  });
});
