import { getBuiltinVersions } from '@fuel-ts/versions/cli';
import fs from 'fs';
import { Provider, Wallet } from 'fuels';
import ora from 'ora';

import { CONTRACT_IDS } from './constants';
import type {
  ContractEnum,
  MeasureResponse,
  Operation,
  PerformanceOperationParams,
  PerformanceResult,
} from './types';

const { log } = console;

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

export const setupPerformanceAnalysis = async (): Promise<PerformanceOperationParams> => {
  // Preparatory steps
  const providerUrl = process.env.PERFORMANCE_ANALYSIS_TEST_URL;
  const privateKey = process.env.PERFORMANCE_ANALYSIS_PVT_KEY;

  const args = process.argv;
  const executionCountIndex = args.indexOf('--execution-count');
  const executionCount = executionCountIndex !== -1 ? args[executionCountIndex + 1] : '1';
  process.env.EXECUTION_COUNT = executionCount;

  if (!providerUrl || !privateKey) {
    throw new Error(
      'Please provide PERFORMANCE_ANALYSIS_TEST_URL and PERFORMANCE_ANALYSIS_PVT_KEY in the .env file'
    );
  }

  const provider = new Provider(providerUrl);
  const account = Wallet.fromPrivateKey(privateKey, provider);
  const baseAssetId = await provider.getBaseAssetId();
  const { nodeVersion } = await provider.getNode();
  process.env.NODE_VERSION = nodeVersion;

  return { account, baseAssetId, provider };
};

/**
 * Assembles the results of a performance operation into a single object.
 *
 * @param results - An array of performance results.
 * @returns A promise that resolves to an array of performance results.
 */
export const parseResults = (results: PerformanceResult[]) => {
  const allMeasured = results.reduce(
    (acc, { tag, duration }) => {
      const durations = acc[tag] ?? [];
      durations.push(duration);
      acc[tag] = durations;
      return acc;
    },
    {} as Record<string, number[]>
  );

  const parsedResults = {} as Record<string, number>;

  for (const [tag, durations] of Object.entries(allMeasured)) {
    parsedResults[tag] = Number(
      (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(3)
    );
  }

  return parsedResults;
};

/**
 * Assembles the results of a performance operation into a single object.
 *
 * @param results - The results of a performance operation.
 * @returns A promise that resolves to an array of performance results.
 */
export const saveResults = (results: Record<string, unknown>) => {
  const DIR_NAME = 'snapshots';
  const date = new Date();
  const filename = `${date.toISOString().slice(0, 16)}.json`;
  fs.mkdirSync(DIR_NAME, { recursive: true });

  const snapshot = {
    'generated-at': date
      .toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'UTC',
      })
      .concat(' UTC'),
    url: process.env.PERFORMANCE_ANALYSIS_TEST_URL,
    'node-version': process.env.NODE_VERSION,
    'sdk-versions': getBuiltinVersions(),
    'execution-count': Number(process.env.EXECUTION_COUNT),
    results,
  };

  fs.writeFileSync(`${DIR_NAME}/${filename}`, JSON.stringify(snapshot, null, 2));

  log(`Snapshots saved into "${DIR_NAME}/${filename}"`);
};

const getChain = (url: string) => {
  if (/testnet/.test(url)) {
    return 'testnet';
  }

  return 'devnet';
};

export const getContractId = (contractEnum: ContractEnum) => {
  const chain = getChain(process.env.PERFORMANCE_ANALYSIS_TEST_URL as string);
  return CONTRACT_IDS[chain][contractEnum];
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
  for (const { tag, operation, preparatorySteps } of operations) {
    const executionCount = Number(process.env.EXECUTION_COUNT as string);
    let count = 0;
    let execute = true;

    const logger = ora({
      text: ``,
      color: 'green',
    }).start();

    while (execute) {
      logger.text = `Performing operation: ${tag} - ${count + 1} of ${executionCount}`;
      try {
        if (preparatorySteps) {
          await preparatorySteps(params);
        }

        // Clear chain info cache
        Provider.clearChainAndNodeCaches();

        const { duration } = await measure(async () => operation(params));
        results.push({ duration, tag });
      } catch (e) {
        logger.fail(`Operation: ${tag} failed during execution ${count}`);
        throw e;
      }

      count++;
      execute = count < executionCount;
    }

    logger.text = `Operation: ${tag} completed ${count} times`;
    logger.succeed();
  }

  return results;
};
