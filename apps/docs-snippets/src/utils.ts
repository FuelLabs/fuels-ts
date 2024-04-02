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

  // create a transaction request to transfer resources to the test wallet
  const request = new ScriptTransactionRequest();

  // add the transaction outputs (coins to be sent to the test wallet)
  (seedQuantities || [[1_000_000, BaseAssetId]])
    .map(coinQuantityfy)
    .forEach(({ amount, assetId }) => request.addCoinOutput(testWallet.address, amount, assetId));

  // get the cost of the transaction
  const { requiredQuantities, gasUsed, maxFee, inputsWithEstimatedPredicates } =
    await genesisWallet.provider.getTransactionCost(request);

  request.gasLimit = gasUsed;
  request.maxFee = maxFee;

  // funding the transaction with the required quantities
  await genesisWallet.fund(request, requiredQuantities, maxFee, inputsWithEstimatedPredicates);

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

  return contractFactory.deployContract({
    storageSlots,
  });
};

export const defaultTxParams = {
  gasLimit: 10000,
};
