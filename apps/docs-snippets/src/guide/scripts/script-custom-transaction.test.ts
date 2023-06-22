import type { CoinQuantityLike, Contract } from 'fuels';
import {
  BN,
  ContractFactory,
  NativeAssetId,
  ScriptTransactionRequest,
  type WalletUnlocked,
} from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';
import { defaultTxParams, getTestWallet } from '../../utils';

describe(__filename, () => {
  let wallet: WalletUnlocked;
  let contract: Contract;

  const assetIdB = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const assetIdA = '0x0202020202020202020202020202020202020202020202020202020202020202';

  const { binHelixfied: scriptBin } = getSnippetProjectArtifacts(
    SnippetProjectEnum.SCRIPT_TRANSFER_TO_CONTRACT
  );

  const { abiContents: contractAbi, binHelixfied: contractBin } = getSnippetProjectArtifacts(
    SnippetProjectEnum.ECHO_VALUES
  );

  const scriptAbiTypes = [
    {
      name: 'contract_address',
      type: 'b256',
    },
    {
      name: 'asset_a',
      type: 'b256',
    },
    {
      name: 'amount_asset_a',
      type: 'u64',
    },
    {
      name: 'asset_b',
      type: 'b256',
    },
    {
      name: 'amount_asset_b',
      type: 'u64',
    },
  ];

  beforeAll(async () => {
    const seedQuantities: CoinQuantityLike[] = [
      [1000, assetIdA],
      [500, assetIdB],
      [1000, NativeAssetId],
    ];

    wallet = await getTestWallet(seedQuantities);

    const factory = new ContractFactory(contractBin, contractAbi, wallet);

    contract = await factory.deployContract();
  });

  it('transfer multiple assets to a contract', async () => {
    const scriptArgs = [contract.id.toB256(), assetIdA, new BN(1000), assetIdB, new BN(500)];

    const request = new ScriptTransactionRequest({
      ...defaultTxParams,
      script: scriptBin,
    }).setData(scriptAbiTypes, scriptArgs);

    const fee = request.calculateFee();

    const quantities: CoinQuantityLike[] = [[1000, assetIdA], [500, assetIdB], fee];

    const resources = await wallet.getResourcesToSpend(quantities);

    const contractInitialBalanceAssetA = await contract.getBalance(assetIdA);
    const contractInitialBalanceAssetB = await contract.getBalance(assetIdB);

    expect(contractInitialBalanceAssetA).toStrictEqual(new BN(0));
    expect(contractInitialBalanceAssetB).toStrictEqual(new BN(0));

    request.addContract(contract.id);
    request.addResources(resources);

    const tx = await wallet.sendTransaction(request);

    await tx.waitForResult();

    const contractFinalBalanceAssetA = await contract.getBalance(assetIdA);
    const contractFinalBalanceAssetB = await contract.getBalance(assetIdB);

    expect(contractFinalBalanceAssetA).toStrictEqual(new BN(1000));
    expect(contractFinalBalanceAssetB).toStrictEqual(new BN(500));
  });
});
