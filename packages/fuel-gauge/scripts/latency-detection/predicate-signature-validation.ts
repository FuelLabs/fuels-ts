import type { BN, ChangeTransactionRequestOutput } from 'fuels';
import { bn, OutputType, ScriptTransactionRequest } from 'fuels';

import type { PredicateSigningLoader } from '../../test/typegen/predicates';
import { PredicateSigning } from '../../test/typegen/predicates';

import {
  TagEnum,
  type Operation,
  type OperationResult,
  type PerformanceOperationParams,
} from './types';

let predicate: PredicateSigningLoader;
let fundAmount: BN;

const transferAmount = 100;
const witnessIndex = 0;

const preparatorySteps = async (params: PerformanceOperationParams) => {
  const { account, provider, baseAssetId } = params;

  // Figuring out the amount to fund the predicate
  if (!fundAmount) {
    predicate = new PredicateSigning({
      provider,
      data: [witnessIndex],
      configurableConstants: {
        SIGNER: account.address.toB256(),
      },
    });

    const { waitForResult } = await predicate.deploy(account);

    predicate = await waitForResult();
    const {
      consensusParameters: {
        txParameters: { maxInputs },
      },
    } = await provider.getChain();

    const request = new ScriptTransactionRequest();

    const fakeResources = predicate.generateFakeResources(
      Array.from({ length: Number(maxInputs) }, () => ({
        amount: bn(1),
        assetId: baseAssetId,
      }))
    );

    request.addResources(fakeResources);

    const signature = await account.signTransaction(request);
    request.addWitness(signature);
    await provider.estimatePredicates(request);

    const { maxFee } = await predicate.getTransactionCost(request);
    fundAmount = maxFee.add(bn(transferAmount));
  }

  // Funding predicate
  const res = await account.transfer(predicate.address, fundAmount, baseAssetId);
  await res.waitForResult();
};

async function operation(params: PerformanceOperationParams): Promise<OperationResult> {
  const { account, baseAssetId, provider } = params;

  const request = new ScriptTransactionRequest();
  request.addCoinOutput(account.address, transferAmount, baseAssetId);

  const resources = await predicate.getResourcesToSpend([
    { amount: transferAmount, assetId: baseAssetId },
  ]);

  request.addResources(resources);

  const changeOutput = request.outputs.find(
    (output) => output.type === OutputType.Change
  ) as ChangeTransactionRequestOutput;

  changeOutput.to = account.address.toB256();

  let signature = await account.signTransaction(request);
  request.addWitness(signature);

  await provider.estimatePredicates(request);
  await request.estimateAndFund(predicate);

  signature = await account.signTransaction(request);
  request.updateWitness(witnessIndex, signature);

  const tx = await provider.sendTransaction(request, { estimateTxDependencies: false });
  return tx.waitForResult();
}

export const predicateSignatureValidation: Operation = {
  tag: TagEnum.PredicateSignatureValidation,
  operation,
  preparatorySteps,
};
