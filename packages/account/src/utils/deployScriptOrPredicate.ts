import type { JsonAbi } from '@fuel-ts/abi-coder';
import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { arrayify } from '@fuel-ts/utils';

import type { Account } from '../account';
import { BlobTransactionRequest, TransactionStatus } from '../providers';

import {
  getBytecodeConfigurableOffset,
  getBytecodeId,
  getPredicateScriptLoaderInstructions,
} from './predicate-script-loader-instructions';

async function fundBlobTx(deployer: Account, blobTxRequest: BlobTransactionRequest) {
  const { assembledRequest } = await deployer.provider.assembleTx({
    request: blobTxRequest,
    feePayerAccount: deployer,
    accountCoinQuantities: [],
  });

  return assembledRequest;
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
  const blobId = getBytecodeId(arrayify(bytecode));

  const configurableOffset = getBytecodeConfigurableOffset(arrayify(bytecode));
  const byteCodeWithoutConfigurableSection = bytecode.slice(0, configurableOffset);

  const blobTxRequest = new BlobTransactionRequest({
    blobId,
    witnessIndex: 0,
    witnesses: [byteCodeWithoutConfigurableSection],
  });

  const { loaderBytecode, blobOffset } = getPredicateScriptLoaderInstructions(
    arrayify(bytecode),
    arrayify(blobId)
  );

  const newConfigurableOffsetDiff = byteCodeWithoutConfigurableSection.length - (blobOffset || 0);
  const newAbi = adjustConfigurableOffsets(abi, newConfigurableOffsetDiff);

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
