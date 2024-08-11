import type { CoinQuantityLike, Contract } from 'fuels';
import {
  FUEL_NETWORK_URL,
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

  // Fetch the base asset ID
  const baseAssetId = provider.getBaseAssetId();

  // instantiate the genesis wallet with its secret key
  const genesisWallet = new WalletUnlocked(process.env.GENESIS_SECRET || '0x01', provider);

  // create a new test wallet
  const testWallet = Wallet.generate({ provider });

  // create a transaction request to transfer resources to the test wallet
  const request = new ScriptTransactionRequest();

  // add the transaction outputs (coins to be sent to the test wallet)
  (seedQuantities || [[100_000_000_000, baseAssetId]])
    .map(coinQuantityfy)
    .forEach(({ amount, assetId }) => request.addCoinOutput(testWallet.address, amount, assetId));

  // get the cost of the transaction
  const txCost = await testWallet.getTransactionCost(request);

  request.gasLimit = txCost.gasUsed;
  request.maxFee = txCost.maxFee;

  // funding the transaction with the required quantities
  await genesisWallet.fund(request, txCost);

  const submit = await genesisWallet.sendTransaction(request);
  await submit.waitForResult();

  // return the test wallet
  return testWallet;
};

export const createAndDeployContractFromProject = async (
  project: DocSnippetProjectsEnum
): Promise<Contract> => {
  const wallet = await getTestWallet();
  const { abiContents, binHexlified, storageSlots } = getDocsSnippetsForcProject(project);

  const contractFactory = new ContractFactory(binHexlified, abiContents, wallet);

  const { waitForResult } = await contractFactory.deploy({
    storageSlots,
  });

  const { contract } = await waitForResult();
  return contract;
};

export const defaultTxParams = {
  gasLimit: 10000,
};
