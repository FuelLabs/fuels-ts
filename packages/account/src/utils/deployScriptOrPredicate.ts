import type { JsonAbi } from '@fuel-ts/abi-coder';
import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { hash } from '@fuel-ts/hasher';
import { bn } from '@fuel-ts/math';
import { arrayify } from '@fuel-ts/utils';

import type { Account } from '../account';
import { BlobTransactionRequest, calculateGasFee, TransactionStatus } from '../providers';

import {
  getDataOffset,
  getPredicateScriptLoaderInstructions,
} from './predicate-script-loader-instructions';

async function fundBlobTx(deployer: Account, blobTxRequest: BlobTransactionRequest) {
  // Check the account can afford to deploy all chunks and loader
  let totalCost = bn(0);
  const chainInfo = deployer.provider.getChain();
  const gasPrice = await deployer.provider.estimateGasPrice(10);
  const priceFactor = chainInfo.consensusParameters.feeParameters.gasPriceFactor;

  const minGas = blobTxRequest.calculateMinGas(chainInfo);

  const minFee = calculateGasFee({
    gasPrice,
    gas: minGas,
    priceFactor,
    tip: blobTxRequest.tip,
  }).add(1);

  totalCost = totalCost.add(minFee);

  if (totalCost.gt(await deployer.getBalance())) {
    throw new FuelError(ErrorCode.FUNDS_TOO_LOW, 'Insufficient balance to deploy predicate.');
  }

  const txCost = await deployer.getTransactionCost(blobTxRequest);
  // eslint-disable-next-line no-param-reassign
  blobTxRequest.maxFee = txCost.maxFee;
  return deployer.fund(blobTxRequest, txCost);
}

function adjustConfigurableOffsets(jsonAbi: JsonAbi, configurableOffsetDiff: number) {
  const { configurables: readOnlyConfigurables } = jsonAbi;
  const configurables: JsonAbi['configurables'] = [];
  readOnlyConfigurables.forEach((config) => {
    // @ts-expect-error shut up the read-only thing
    configurables.push({ ...config, offset: config.offset - configurableOffsetDiff });
  });
  return { ...jsonAbi, configurables } as JsonAbi;
}

interface Deployer<T> {
  deployer: Account;
  bytecode: Uint8Array;
  abi: JsonAbi;
  loaderInstanceCallback: (loaderBytecode: Uint8Array, newAbi: JsonAbi) => T;
}

export async function deployScriptOrPredicate<T>({
  deployer,
  bytecode,
  abi,
  loaderInstanceCallback,
}: Deployer<T>) {
  const dataSectionOffset = getDataOffset(arrayify(bytecode));
  const byteCodeWithoutDataSection = bytecode.slice(0, dataSectionOffset);

  // Generate the associated create tx for the loader contract
  const blobId = hash(byteCodeWithoutDataSection);

  const blobTxRequest = new BlobTransactionRequest({
    blobId,
    witnessIndex: 0,
    witnesses: [byteCodeWithoutDataSection],
  });

  const { loaderBytecode, blobOffset } = getPredicateScriptLoaderInstructions(
    arrayify(bytecode),
    arrayify(blobId)
  );

  const configurableOffsetDiff = byteCodeWithoutDataSection.length - (blobOffset || 0);
  const newAbi = adjustConfigurableOffsets(abi, configurableOffsetDiff);

  const blobExists = (await deployer.provider.getBlobs([blobId])).length > 0;

  const loaderInstance = loaderInstanceCallback(loaderBytecode, newAbi);
  if (blobExists) {
    return {
      waitForResult: () => Promise.resolve(loaderInstance),
      blobId,
    };
  }

  const fundedBlobRequest = await fundBlobTx(deployer, blobTxRequest);

  // Transaction id is unset until we have funded the create tx, which is dependent on the blob tx
  const waitForResult = async () => {
    try {
      const blobTx = await deployer.sendTransaction(fundedBlobRequest);
      const result = await blobTx.waitForResult();

      if (result.status !== TransactionStatus.success) {
        throw new Error();
      }
    } catch (err: unknown) {
      throw new FuelError(ErrorCode.TRANSACTION_FAILED, 'Failed to deploy predicate chunk');
    }

    return loaderInstance;
  };

  return {
    waitForResult,
    blobId,
  };
}
