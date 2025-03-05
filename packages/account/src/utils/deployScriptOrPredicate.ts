import type { JsonAbi } from '@fuel-ts/abi-coder';
import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { arrayify } from '@fuel-ts/utils';

import type { Account } from '../account';
import { BlobTransactionRequest, resolveAccount, TransactionStatus } from '../providers';

import {
  getBytecodeConfigurableOffset,
  getBytecodeId,
  getPredicateScriptLoaderInstructions,
} from './predicate-script-loader-instructions';

async function fundBlobTx(deployer: Account, blobTxRequest: BlobTransactionRequest) {
  const baseAssetId = await deployer.provider.getBaseAssetId();

  const { transactionRequest } = await deployer.provider.assembleTX({
    transactionRequest: blobTxRequest,
    estimatePredicates: true,
    requiredBalances: [
      {
        account: resolveAccount(deployer),
        amount: bn(0),
        assetId: baseAssetId,
        changePolicy: {
          change: deployer.address.b256Address,
        },
      },
    ],
    blockHorizon: 10,
    feeAddressIndex: 0,
  });

  return transactionRequest;

  // TODO: Consider using a try/catch here to identify not enough funds error and throw the following error
  // if (totalCost.gt(await deployer.getBalance())) {
  //   throw new FuelError(ErrorCode.FUNDS_TOO_LOW, 'Insufficient balance to deploy predicate.');
  // }
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
