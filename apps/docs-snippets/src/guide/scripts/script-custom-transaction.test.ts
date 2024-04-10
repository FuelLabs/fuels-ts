import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';
import {
  BN,
  ContractFactory,
  ScriptTransactionRequest,
  ZeroBytes32,
  Provider,
  FUEL_NETWORK_URL,
} from 'fuels';
import type { CoinQuantityLike, Contract, WalletUnlocked } from 'fuels';

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
  let baseAssetId: string;

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
      [300_000, ZeroBytes32],
    ];

    provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    wallet = await getTestWallet(seedQuantities);
    const factory = new ContractFactory(contractBin, contractAbi, wallet);
    const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();
    contract = await factory.deployContract({ gasPrice, baseAssetId });
  });

  it('transfer multiple assets to a contract', async () => {
    const contractInitialBalanceAssetA = await contract.getBalance(ASSET_A);
    const contractInitialBalanceAssetB = await contract.getBalance(ASSET_B);

    expect(contractInitialBalanceAssetA).toStrictEqual(new BN(0));
    expect(contractInitialBalanceAssetB).toStrictEqual(new BN(0));

    // #region custom-transactions-2
    // #import { BN, CoinQuantityLike, ScriptTransactionRequest };

    // 1. Create a script transaction using the script binary
    const { minGasPrice } = provider.getGasConfig();

    const request = new ScriptTransactionRequest({
      ...defaultTxParams,
      gasLimit: 3_000_000,
      script: scriptBin,
      gasPrice: minGasPrice,
      baseAssetId: provider.getBaseAssetId(),
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
    const { maxFee } = await provider.getTransactionCost(request);

    // 5. Get the transaction resources
    const quantities: CoinQuantityLike[] = [
      [1000, ASSET_A],
      [500, ASSET_B],
      [maxFee, baseAssetId],
    ];

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
