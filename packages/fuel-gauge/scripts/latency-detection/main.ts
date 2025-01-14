import 'dotenv/config';
import fs from 'fs';
import { Provider, Wallet } from 'fuels';

import { TransferContractFactory } from '../../test/typegen/contracts';
import { PredicateWithConfigurable } from '../../test/typegen/predicates';

import { toCsv } from './helpers';
import { missing4xOutputVariableCall } from './missing-4x-variable-output-call';
import { missingOutputVariableCall } from './missing-variable-output-call';
import { scriptCall } from './script-call';
import { scriptWithPredicateCall } from './script-with-predicate-call';
import type { PerformanceResult } from './types';

const operations = [
  scriptCall,
  missingOutputVariableCall,
  missing4xOutputVariableCall,
  scriptWithPredicateCall,
];

const preparatorySteps = async () => {
  // Preparatory steps
  const providerUrl = process.env.PERFORMANCE_ANALYSIS_TEST_URL;
  const privateKey = process.env.PERFORMANCE_ANALYSIS_PVT_KEY;

  if (!providerUrl || !privateKey) {
    throw new Error(
      'Please provide PERFORMANCE_ANALYSIS_TEST_URL and PERFORMANCE_ANALYSIS_PVT_KEY in the .env file'
    );
  }

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

  return { account, baseAssetId, provider, contract, callParams, predicate };
};

const main = async () => {
  const { account, baseAssetId, callParams, contract, predicate, provider } =
    await preparatorySteps();
  const results: PerformanceResult[] = [];

  // Performing measure operations
  for (const operation of operations) {
    // Clear chain info cache
    Provider.clearChainAndNodeCaches();

    const result = await operation({
      account,
      baseAssetId,
      provider,
      contract,
      callParams,
      predicate,
    });

    results.push(result);
  }

  const csvString = toCsv(['tag', 'time'], results);
  const date = new Date();
  fs.mkdirSync('snapshots', { recursive: true });
  fs.writeFileSync(`snapshots/${date.toISOString().slice(0, 10)}.csv`, csvString);
};

main().catch(console.error);
