import 'dotenv/config';
import fs from 'fs';
import { Provider, Wallet } from 'fuels';
import ora from 'ora';

import { TransferContractFactory } from '../../test/typegen/contracts';
import { PredicateWithConfigurable } from '../../test/typegen/predicates';

import { toCsv } from './helpers';
import { missing4xOutputVariableCall } from './missing-4x-variable-output-call';
import { missingOutputVariableCall } from './missing-variable-output-call';
import { scriptCall } from './script-call';
import { scriptWithPredicateCall } from './script-with-predicate-call';
import type { PerformanceOperationParams, PerformanceResult } from './types';

const { log, error } = console;

const preparatorySteps = async () => {
  // Preparatory steps
  const providerUrl = process.env.PERFORMANCE_ANALYSIS_TEST_URL;
  const privateKey = process.env.PERFORMANCE_ANALYSIS_PVT_KEY;

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
    const factory = new TransferContractFactory(account);
    const deploy = await factory.deploy();
    const { contract } = await deploy.waitForResult();

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

    logger.text = 'Preparatory steps done';
    logger.succeed();

    return { account, baseAssetId, provider, contract, callParams, predicate };
  } catch (e) {
    logger.fail('Failed to run preparatory steps');
    throw e;
  }
};

const runOperations = async (params: PerformanceOperationParams) => {
  const results: PerformanceResult[] = [];

  const operations = [
    scriptCall,
    missingOutputVariableCall,
    missing4xOutputVariableCall,
    scriptWithPredicateCall,
  ];

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

const main = async () => {
  const operationsParams = await preparatorySteps();

  const results = await runOperations(operationsParams);

  const csvString = toCsv(['tag', 'time'], results);
  const date = new Date();
  const filename = `${date.toISOString().slice(0, 10)}.csv`;
  fs.mkdirSync('snapshots', { recursive: true });
  fs.writeFileSync(filename, csvString);
  log(`Snapshots saved into "snapshots/${filename}"`);
};

main().catch(error);
