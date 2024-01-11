import type { CoinQuantityLike, Contract } from 'fuels';
import {
  FUEL_NETWORK_URL,
  BaseAssetId,
  Provider,
  ScriptTransactionRequest,
  Wallet,
  WalletUnlocked,
  coinQuantityfy,
  ContractFactory,
} from 'fuels';

import type { DocSnippetProjectsEnum } from '../test/fixtures/forc-projects';
import { getDocsSnippetsForcProject } from '../test/fixtures/forc-projects';

export const getTestWallet = async (seedQuantities?: CoinQuantityLike[]) => {
  // create a provider using the Fuel network URL
  const provider = await Provider.create(FUEL_NETWORK_URL);

  // instantiate the genesis wallet with its secret key
  const genesisWallet = new WalletUnlocked(process.env.GENESIS_SECRET || '0x01', provider);

  // create a new test wallet
  const testWallet = Wallet.generate({ provider });

  const { minGasPrice } = provider.getGasConfig();

  // create a transaction request to transfer resources to the test wallet
  const request = new ScriptTransactionRequest({
    gasLimit: 10000,
    gasPrice: minGasPrice,
  });

  // add the transaction outputs (coins to be sent to the test wallet)
  (seedQuantities || [[1_000_000, BaseAssetId]])
    .map(coinQuantityfy)
    .forEach(({ amount, assetId }) => request.addCoinOutput(testWallet.address, amount, assetId));

  // get the cost of the transaction
  const { minFee, requiredQuantities, gasUsed } =
    await genesisWallet.provider.getTransactionCost(request);

  request.gasLimit = gasUsed;

  // funding the transaction with the required quantities
  await genesisWallet.fund(request, requiredQuantities, minFee);

  await genesisWallet.sendTransaction(request, { awaitExecution: true });

  // return the test wallet
  return testWallet;
};

export const createAndDeployContractFromProject = async (
  project: DocSnippetProjectsEnum
): Promise<Contract> => {
  const wallet = await getTestWallet();
  const { abiContents, binHexlified, storageSlots } = getDocsSnippetsForcProject(project);

  const contractFactory = new ContractFactory(binHexlified, abiContents, wallet);

  const { minGasPrice } = wallet.provider.getGasConfig();

  return contractFactory.deployContract({
    storageSlots,
    gasPrice: minGasPrice,
  });
};

export const defaultTxParams = {
  gasLimit: 10000,
  gasPrice: 1,
};
