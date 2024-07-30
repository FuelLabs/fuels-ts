import {
  BN,
  ContractFactory,
  FUEL_NETWORK_URL,
  ScriptTransactionRequest,
  coinQuantityfy,
  Provider,
} from 'fuels';
import type { CoinQuantityLike, Contract, WalletUnlocked } from 'fuels';
import { ASSET_A, ASSET_B } from 'fuels/test-utils';

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
    provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    const seedQuantities: CoinQuantityLike[] = [
      [1000, ASSET_A],
      [500, ASSET_B],
      [300_000, baseAssetId],
    ];
    wallet = await getTestWallet(seedQuantities);
    const factory = new ContractFactory(contractBin, contractAbi, wallet);
    const { waitForResult } = await factory.deployContract();
    ({ contract } = await waitForResult());
  });

  it('transfer multiple assets to a contract', async () => {
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
      script: scriptBin,
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
    request.setData(abiContents, scriptArguments).addContractInputAndOutput(contract.id);

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
