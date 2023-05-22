import type { CoinQuantityLike, Contract } from 'fuels';
import {
  FUEL_NETWORK_URL,
  NativeAssetId,
  Provider,
  ScriptTransactionRequest,
  Wallet,
  WalletUnlocked,
  coinQuantityfy,
  ContractFactory,
} from 'fuels';

import type { SnippetProjectEnum } from '../projects';
import { getSnippetProjectArtifacts } from '../projects';

export const getTestWallet = async () => {
  // create a provider using the Fuel network URL
  const provider = new Provider(FUEL_NETWORK_URL);

  // instantiate the genesis wallet with its secret key
  const genesisWallet = new WalletUnlocked(process.env.GENESIS_SECRET || '0x01', provider);

  // define the quantity of assets to transfer to the test wallet
  const quantities: CoinQuantityLike[] = [
    {
      amount: 1_000_000,
      assetId: NativeAssetId,
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

  // return the test wallet
  return testWallet;
};

export const createAndDeployContractFromProject = async (
  project: SnippetProjectEnum
): Promise<Contract> => {
  const wallet = await getTestWallet();
  const { abiContents, binHexlified } = getSnippetProjectArtifacts(project);

  const contractFactory = new ContractFactory(binHexlified, abiContents, wallet);

  return contractFactory.deployContract();
};
