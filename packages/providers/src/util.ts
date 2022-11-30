import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import type { BN } from '@fuel-ts/math';
import { multiply, bn } from '@fuel-ts/math';
import type { ReceiptPanic, ReceiptRevert } from '@fuel-ts/transactions';
import {
  FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  GAS_PRICE_FACTOR,
  ReceiptType,
} from '@fuel-ts/transactions';

import type { TransactionResultReceipt } from './transaction-response';

// TODO: create a fuel-ts/bytes package
// This custom arrayify enables to parse a object from Uint8Array
// stringify back to a Uint8Array by setting the missing length field
export const arraifyFromUint8Array = (bytes: BytesLike): Uint8Array => {
  if (bytes.length == null && typeof bytes === 'object') {
    const length = Object.keys(bytes).length;
    return arrayify({
      ...bytes,
      length,
    });
  }
  return arrayify(bytes);
};

export const calculatePriceWithFactor = (gasUsed: BN, gasPrice: BN, priceFactor: BN): BN =>
  bn(Math.ceil(gasUsed.toNumber() / priceFactor.toNumber()) * gasPrice.toNumber());

export const getGasUsedFromReceipts = (receipts: Array<TransactionResultReceipt>): BN => {
  const scriptResult = receipts.find((receipt) => receipt.type === ReceiptType.ScriptResult);

  if (scriptResult && scriptResult.type === ReceiptType.ScriptResult) {
    return scriptResult.gasUsed;
  }

  return bn(0);
};

export function sleep(time: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

const doesReceiptHaveMissingOutputVariables = (
  receipt: TransactionResultReceipt
): receipt is ReceiptRevert =>
  receipt.type === ReceiptType.Revert &&
  receipt.val.toString('hex') === FAILED_TRANSFER_TO_ADDRESS_SIGNAL;

const doesReceiptHaveMissingContractId = (
  receipt: TransactionResultReceipt
): receipt is ReceiptPanic =>
  receipt.type === ReceiptType.Panic &&
  receipt.contractId !== '0x0000000000000000000000000000000000000000000000000000000000000000';

export const getReceiptsWithMissingData = (receipts: Array<TransactionResultReceipt>) =>
  receipts.reduce<{
    missingOutputVariables: Array<ReceiptRevert>;
    missingOutputContractIds: Array<ReceiptPanic>;
  }>(
    (memo, receipt) => {
      if (doesReceiptHaveMissingOutputVariables(receipt)) {
        memo.missingOutputVariables.push(receipt);
      }
      if (doesReceiptHaveMissingContractId(receipt)) {
        memo.missingOutputContractIds.push(receipt);
      }
      return memo;
    },
    {
      missingOutputVariables: [],
      missingOutputContractIds: [],
    }
  );

export const calculateTransactionFee = ({
  receipts,
  gasPrice,
  margin,
}: {
  receipts: TransactionResultReceipt[];
  gasPrice: BN;
  margin?: number;
}) => {
  const gasUsed = multiply(getGasUsedFromReceipts(receipts), margin || 1);
  const fee = calculatePriceWithFactor(gasUsed, gasPrice, GAS_PRICE_FACTOR);

  return {
    gasUsed,
    fee,
  };
};

const DEFAULT_BLOCK_EXPLORER_URL = 'https://fuellabs.github.io/block-explorer-v2';

/**
 * Builds a block explorer url based on and the given path, block explorer URL and provider URL
 */
export const buildBlockExplorerUrl = ({
  blockExplorerUrl,
  path,
  providerUrl,
}: {
  blockExplorerUrl?: string;
  path: string;
  providerUrl?: string;
}) => {
  const explorerUrl = blockExplorerUrl || DEFAULT_BLOCK_EXPLORER_URL;

  // Remove leading and trailing slashes from the path and block explorer url respectively, if present
  const trimSlashes = /^\/|\/$/gm;
  const cleanPath = path.replace(trimSlashes, '');
  const cleanBlockExplorerUrl = explorerUrl.replace(trimSlashes, '');
  const cleanProviderUrl = providerUrl?.replace(trimSlashes, '');
  const encodedProviderUrl = cleanProviderUrl ? encodeURIComponent(cleanProviderUrl) : undefined;

  // if the block explorer url doesn't have a protocol i.e. http:// or https://, add https://
  const protocol = cleanBlockExplorerUrl.match(/^https?:\/\//) ? '' : 'https://';
  const providerUrlProtocol = cleanProviderUrl?.match(/^https?:\/\//) ? '' : 'https://';

  const url = `${protocol}${cleanBlockExplorerUrl}/${cleanPath}${
    encodedProviderUrl ? `?providerUrl=${providerUrlProtocol}${encodedProviderUrl}` : ''
  }`;

  return url;
};
