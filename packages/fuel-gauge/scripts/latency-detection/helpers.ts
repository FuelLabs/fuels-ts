import { Provider, Wallet } from 'fuels';
import ora from 'ora';

import { TransferContract, TransferContractFactory } from '../../test/typegen/contracts';
import { PredicateWithConfigurable } from '../../test/typegen/predicates';

import type {
  MeasureResponse,
  Operation,
  PerformanceOperationParams,
  PerformanceResult,
} from './types';

/**
 * Function to measure the execution time (in seconds) of an asynchronous operation.
 *
 * @param operation - The asynchronous function (Promise) that will be executed and measured.
 * @returns An object containing the `response` of the operation and the `duration` in seconds.
 */
export async function measure<T>(operation: () => Promise<T>): Promise<MeasureResponse<T>> {
  const start = Date.now();
  const response = await operation();
  const end = Date.now();

  return {
    response,
    duration: (end - start) / 1000,
  };
}

/**
 * Executes preparatory steps for latency detection.
 *
 * This function performs the following steps:
 * 1. Retrieves the provider URL and private key from environment variables.
 * 2. Initializes a logger to indicate the progress of the preparatory steps.
 * 3. Creates a provider and account using the retrieved credentials.
 * 4. Retrieves the base asset ID from the provider.
 * 5. Deploys a transfer contract and waits for the deployment result.
 * 6. Instantiates a predicate with configurable constants.
 * 7. Funds the predicate with a specified amount.
 *
 *
 * @returns The parameters to run a performance operation.
 */
export const preparatorySteps = async (): Promise<PerformanceOperationParams> => {
  // Preparatory steps
  const providerUrl = process.env.PERFORMANCE_ANALYSIS_TEST_URL;
  const privateKey = process.env.PERFORMANCE_ANALYSIS_PVT_KEY;
  const contractAddress = process.env.PERFORMANCE_ANALYSIS_CONTRACT_ADDRESS;

  if (!providerUrl || !privateKey) {
    throw new Error(
      'Please provide PERFORMANCE_ANALYSIS_TEST_URL and PERFORMANCE_ANALYSIS_PVT_KEY in the .env file'
    );
  }

  const logger = ora({
    text: 'Running preparatory steps..',
    color: 'green',
  }).start();

  try {
    const provider = new Provider(providerUrl);
    const account = Wallet.fromPrivateKey(privateKey, provider);
    const baseAssetId = await provider.getBaseAssetId();
    const amount = 100;
    const callParams = [
      {
        recipient: { Address: { bits: account.address.toB256() } },
        asset_id: { bits: baseAssetId },
        amount,
      },
    ];

    // Deploying contract that will be executed
    let contract: TransferContract;
    let deployedMsg = '';
    if (!contractAddress) {
      const factory = new TransferContractFactory(account);
      const deploy = await factory.deploy();
      const result = await deploy.waitForResult();
      contract = result.contract;
      deployedMsg = `\n- contract deployed on address: ${contract.id.toB256()}`;
    } else {
      contract = new TransferContract(contractAddress, account);
    }

    // Instantiating predicate
    const predicate = new PredicateWithConfigurable({
      provider: contract.provider,
      data: [10, account.address.toString()],
      configurableConstants: {
        ADDRESS: account.address.toString(),
        FEE: 10,
      },
    });

    // Funding predicate
    const res = await account.transfer(predicate.address, 3000, baseAssetId);
    await res.waitForResult();

    logger.succeed(`Preparatory steps done${deployedMsg}`);

    return { account, baseAssetId, provider, contract, callParams, predicate };
  } catch (e) {
    logger.fail('Failed to run preparatory steps');
    throw e;
  }
};

/**
 * Executes a series of performance measure operations and returns their results.
 *
 * @param operations - An array of operations to be performed.
 * @param params - Parameters to be passed to each operation.
 * @returns A promise that resolves to an array of performance results.
 */
export const runOperations = async (
  operations: Array<Operation>,
  params: PerformanceOperationParams
) => {
  const results: PerformanceResult[] = [];

  // Performing measure operations
  for (const operation of operations) {
    const logger = ora({
      text: `Performing operation: ${operation.name}`,
      color: 'green',
    }).start();
    try {
      // Clear chain info cache
      Provider.clearChainAndNodeCaches();

      const result = await operation(params);

      logger.text = `Operation: ${operation.name} completed`;
      logger.succeed();

      results.push(result);
    } catch (e) {
      logger.fail(`Operation: ${operation.name} failed`);
      throw e;
    }
  }

  return results;
};
