import { setupTestProvider } from '@fuel-ts/providers/test-utils';
import type { CoinQuantityLike, Contract } from 'fuels';
import {
  BaseAssetId,
  ScriptTransactionRequest,
  Wallet,
  WalletUnlocked,
  coinQuantityfy,
  ContractFactory,
} from 'fuels';

import type { SnippetProjectEnum } from '../projects';
import { getSnippetProjectArtifacts } from '../projects';

export const getTestWallet = async <Dispose extends boolean = true>(
  seedQuantities?: CoinQuantityLike[],
  runCleanup?: Dispose
): Promise<
  Dispose extends true
    ? WalletUnlocked & Disposable
    : { wallet: WalletUnlocked; cleanup: () => void }
> => {
  // create a provider using the Fuel network URL
  const { provider, cleanup } = await setupTestProvider(undefined, false);

  // instantiate the genesis wallet with its secret key
  const genesisWallet = new WalletUnlocked(process.env.GENESIS_SECRET || '0x01', provider);

  // define the quantity of assets to transfer to the test wallet
  const quantities: CoinQuantityLike[] = seedQuantities || [
    {
      amount: 1_000_000,
      assetId: BaseAssetId,
    },
  ];

  // retrieve resources needed to spend the specified quantities
  const resources = await genesisWallet.getResourcesToSpend(quantities);

  // create a new test wallet
  const testWallet = Wallet.generate({ provider });

  // create a transaction request to transfer resources to the test wallet
  const request = new ScriptTransactionRequest({
    gasLimit: 10000,
    gasPrice: 1,
  });

  // add the UTXO inputs to the transaction request
  request.addResources(resources);

  // add the transaction outputs (coins to be sent to the test wallet)
  quantities
    .map(coinQuantityfy)
    .forEach(({ amount, assetId }) => request.addCoinOutput(testWallet.address, amount, assetId));

  // execute the transaction, transferring resources to the test wallet
  const response = await genesisWallet.sendTransaction(request);

  // wait for the transaction to be confirmed
  await response.wait();

  const dispose = runCleanup ?? true;

  // return the test wallet
  // @ts-expect-error ASDF
  return dispose
    ? Object.assign(testWallet, {
        [Symbol.dispose]() {
          cleanup();
        },
      })
    : {
        wallet: testWallet,
        cleanup,
      };
};

export const createAndDeployContractFromProject = async (
  project: SnippetProjectEnum
): Promise<Contract & Disposable> => {
  const { wallet, cleanup } = await getTestWallet(undefined, false);
  const { abiContents, binHexlified, storageSlots } = getSnippetProjectArtifacts(project);

  const contractFactory = new ContractFactory(binHexlified, abiContents, wallet);
  const contract = await contractFactory.deployContract({
    storageSlots,
  });

  return Object.assign(contract, {
    [Symbol.dispose]() {
      cleanup();
    },
  });
};

export const defaultTxParams = {
  gasLimit: 10000,
  gasPrice: 1,
};
