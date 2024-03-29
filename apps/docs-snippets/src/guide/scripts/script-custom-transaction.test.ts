import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';
import { BN, ContractFactory, BaseAssetId, ScriptTransactionRequest } from 'fuels';
import type { CoinQuantityLike, Contract, WalletUnlocked, Provider } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { defaultTxParams, getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let wallet: WalletUnlocked;
  let provider: Provider;
  let contract: Contract;

  const { binHexlified: scriptBin, abiContents } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SCRIPT_TRANSFER_TO_CONTRACT
  );

  const { abiContents: contractAbi, binHexlified: contractBin } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.ECHO_VALUES
  );

  beforeAll(async () => {
    const seedQuantities: CoinQuantityLike[] = [
      [1000, ASSET_A],
      [500, ASSET_B],
      [300_000, BaseAssetId],
    ];

    wallet = await getTestWallet(seedQuantities);
    provider = wallet.provider;
    const factory = new ContractFactory(contractBin, contractAbi, wallet);
    contract = await factory.deployContract();
  });

  it('transfer multiple assets to a contract', async () => {
    const contractInitialBalanceAssetA = await contract.getBalance(ASSET_A);
    const contractInitialBalanceAssetB = await contract.getBalance(ASSET_B);

    expect(contractInitialBalanceAssetA).toStrictEqual(new BN(0));
    expect(contractInitialBalanceAssetB).toStrictEqual(new BN(0));

    // #region custom-transactions-2
    // #import { BN, CoinQuantityLike, ScriptTransactionRequest };

    // 1. Create a script transaction using the script binary
    const request = new ScriptTransactionRequest({
      ...defaultTxParams,
      gasLimit: 3_000_000,
      script: scriptBin,
    });

    // 2. Instantiate the script main arguments
    const scriptArguments = [
      contract.id.toB256(),
      { value: ASSET_A },
      new BN(1000),
      { value: ASSET_B },
      new BN(500),
    ];

    // 3. Populate the script data and add the contract input and output
    request.setData(abiContents, scriptArguments).addContractInputAndOutput(contract.id);

    // 4. Calculate the transaction fee
    const { maxFee, gasUsed } = await provider.getTransactionCost(request);

    // 5. Get the transaction resources
    const quantities: CoinQuantityLike[] = [
      [1000, ASSET_A],
      [500, ASSET_B],
      [maxFee, BaseAssetId],
    ];

    request.gasLimit = gasUsed;
    request.maxFee = maxFee;

    const resources = await wallet.getResourcesToSpend(quantities);

    request.addResources(resources);

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
