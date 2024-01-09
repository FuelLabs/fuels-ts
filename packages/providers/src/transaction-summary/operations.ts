import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { ReceiptType, TransactionType } from '@fuel-ts/transactions';
import type { Output } from '@fuel-ts/transactions';

import type {
  TransactionResultReceipt,
  TransactionResultCallReceipt,
  TransactionResultMessageOutReceipt,
  TransactionResultTransferOutReceipt,
  TransactionResultTransferReceipt,
} from '../transaction-response';

import { getFunctionCall } from './call';
import {
  getInputFromAssetId,
  getInputAccountAddress,
  getInputContractFromIndex,
  getInputsCoin,
  getInputsContract,
} from './input';
import {
  getOutputsChange,
  getOutputsCoin,
  getOutputsContract,
  getOutputsContractCreated,
} from './output';
import { AddressType, ChainName, OperationName, TransactionTypeName } from './types';
import type {
  InputOutputParam,
  InputParam,
  OperationCoin,
  RawPayloadParam,
  ReceiptParam,
  Operation,
  GetOperationParams,
  GetTransferOperationsParams,
} from './types';

/** @hidden */
export function getReceiptsByType<T = TransactionResultReceipt>(
  receipts: TransactionResultReceipt[],
  type: ReceiptType
) {
  return (receipts ?? []).filter((r) => r.type === type) as T[];
}

/** @hidden */
export function getTransactionTypeName(transactionType: TransactionType): TransactionTypeName {
  switch (transactionType) {
    case TransactionType.Mint:
      return TransactionTypeName.Mint;
    case TransactionType.Create:
      return TransactionTypeName.Create;
    case TransactionType.Script:
      return TransactionTypeName.Script;
    default:
      throw new FuelError(
        ErrorCode.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${transactionType}.`
      );
  }
}

/** @hidden */
export function isType(transactionType: TransactionType, type: TransactionTypeName) {
  const txType = getTransactionTypeName(transactionType);

  return txType === type;
}

/** @hidden */
export function isTypeMint(transactionType: TransactionType) {
  return isType(transactionType, TransactionTypeName.Mint);
}

/** @hidden */
export function isTypeCreate(transactionType: TransactionType) {
  return isType(transactionType, TransactionTypeName.Create);
}

/** @hidden */
export function isTypeScript(transactionType: TransactionType) {
  return isType(transactionType, TransactionTypeName.Script);
}

/** @hidden */
export function hasSameAssetId(a: OperationCoin) {
  return (b: OperationCoin) => a.assetId === b.assetId;
}

/** @hidden */
export function getReceiptsCall(receipts: TransactionResultReceipt[]) {
  return getReceiptsByType<TransactionResultCallReceipt>(receipts, ReceiptType.Call);
}

/** @hidden */
export function getReceiptsMessageOut(receipts: TransactionResultReceipt[]) {
  return getReceiptsByType<TransactionResultMessageOutReceipt>(receipts, ReceiptType.MessageOut);
}

/** @hidden */
const mergeAssets = (op1: Operation, op2: Operation) => {
  const assets1 = op1.assetsSent || [];
  const assets2 = op2.assetsSent || [];

  // Getting assets from op2 that don't exist in op1
  const filteredAssets = assets2.filter(
    (asset2) => !assets1.some((asset1) => asset1.assetId === asset2.assetId)
  );

  // Merge assets that already exist in op1
  const mergedAssets = assets1.map((asset1) => {
    // Find matching asset in op2
    const matchingAsset = assets2.find((asset2) => asset2.assetId === asset1.assetId);
    if (!matchingAsset) {
      // No matching asset found, return asset1
      return asset1;
    }
    // Matching asset found, merge amounts
    const mergedAmount = bn(asset1.amount).add(matchingAsset.amount);
    return { ...asset1, amount: mergedAmount };
  });

  // Return merged assets from op1 with filtered assets from op2
  return mergedAssets.concat(filteredAssets);
};

/** @hidden */
function isSameOperation(a: Operation, b: Operation) {
  return (
    a.name === b.name &&
    a.from?.address === b.from?.address &&
    a.to?.address === b.to?.address &&
    a.from?.type === b.from?.type &&
    a.to?.type === b.to?.type
  );
}

/** @hidden */
export function addOperation(operations: Operation[], toAdd: Operation) {
  const allOperations = [...operations];

  // Verifying if the operation to add already exists.
  const index = allOperations.findIndex((op) => isSameOperation(op, toAdd));

  if (allOperations[index]) {
    // Existent operation, we want to edit it.
    const existentOperation = { ...allOperations[index] };

    if (toAdd.assetsSent?.length) {
      /**
       * If the assetSent already exists, we call 'mergeAssets' to merge possible
       * entries of the same 'assetId', otherwise we just add the new 'assetSent'.
       */
      existentOperation.assetsSent = existentOperation.assetsSent?.length
        ? mergeAssets(existentOperation, toAdd)
        : toAdd.assetsSent;
    }

    if (toAdd.calls?.length) {
      // We need to stack the new call(s) with the possible existent ones.
      existentOperation.calls = [...(existentOperation.calls || []), ...toAdd.calls];
    }

    allOperations[index] = existentOperation;
  } else {
    // New operation, we can simply add it.
    allOperations.push(toAdd);
  }

  return allOperations;
}

/** @hidden */
export function getReceiptsTransferOut(receipts: TransactionResultReceipt[]) {
  return getReceiptsByType<TransactionResultTransferOutReceipt>(receipts, ReceiptType.TransferOut);
}

/** @hidden */
export function getContractTransferOperations({ receipts }: ReceiptParam): Operation[] {
  const transferOutReceipts = getReceiptsTransferOut(receipts);

  const contractTransferOperations = transferOutReceipts.reduce(
    (prevContractTransferOps, receipt) => {
      const newContractTransferOps = addOperation(prevContractTransferOps, {
        name: OperationName.contractTransfer,
        from: {
          type: AddressType.contract,
          address: receipt.from,
        },
        to: {
          type: AddressType.account,
          address: receipt.to,
        },
        assetsSent: [
          {
            amount: receipt.amount,
            assetId: receipt.assetId,
          },
        ],
      });

      return newContractTransferOps;
    },
    [] as Operation[]
  );

  return contractTransferOperations;
}

/** @hidden */
export function getWithdrawFromFuelOperations({
  inputs,
  receipts,
}: InputParam & ReceiptParam): Operation[] {
  const messageOutReceipts = getReceiptsMessageOut(receipts);

  const withdrawFromFuelOperations = messageOutReceipts.reduce(
    (prevWithdrawFromFuelOps, receipt) => {
      // TODO: replace this hardcode with receipt.assetId when assetId gets added to MessageOutReceipt
      const assetId = '0x0000000000000000000000000000000000000000000000000000000000000000';
      const input = getInputFromAssetId(inputs, assetId);
      if (input) {
        const inputAddress = getInputAccountAddress(input);
        const newWithdrawFromFuelOps = addOperation(prevWithdrawFromFuelOps, {
          name: OperationName.withdrawFromFuel,
          from: {
            type: AddressType.account,
            address: inputAddress,
          },
          to: {
            type: AddressType.account,
            address: receipt.recipient.toString(),
            chain: ChainName.ethereum,
          },
          assetsSent: [
            {
              amount: receipt.amount,
              assetId,
            },
          ],
        });

        return newWithdrawFromFuelOps;
      }

      return prevWithdrawFromFuelOps;
    },
    [] as Operation[]
  );

  return withdrawFromFuelOperations;
}

/** @hidden */
export function getContractCallOperations({
  inputs,
  outputs,
  receipts,
  abiMap,
  rawPayload,
  maxInputs,
}: InputOutputParam &
  ReceiptParam &
  Pick<GetOperationParams, 'abiMap' | 'maxInputs'> &
  RawPayloadParam): Operation[] {
  const contractCallReceipts = getReceiptsCall(receipts);
  const contractOutputs = getOutputsContract(outputs);

  const contractCallOperations = contractOutputs.reduce((prevOutputCallOps, output) => {
    const contractInput = getInputContractFromIndex(inputs, output.inputIndex);

    if (contractInput) {
      const newCallOps = contractCallReceipts.reduce((prevContractCallOps, receipt) => {
        if (receipt.to === contractInput.contractID) {
          const input = getInputFromAssetId(inputs, receipt.assetId);
          if (input) {
            const inputAddress = getInputAccountAddress(input);
            const calls = [];

            const abi = abiMap?.[contractInput.contractID];
            if (abi) {
              calls.push(
                getFunctionCall({
                  abi,
                  receipt,
                  rawPayload,
                  maxInputs,
                })
              );
            }

            const newContractCallOps = addOperation(prevContractCallOps, {
              name: OperationName.contractCall,
              from: {
                type: AddressType.account,
                address: inputAddress,
              },
              to: {
                type: AddressType.contract,
                address: receipt.to,
              },
              // if no amount is forwarded to the contract, skip showing assetsSent
              assetsSent: receipt.amount?.isZero()
                ? undefined
                : [
                    {
                      amount: receipt.amount,
                      assetId: receipt.assetId,
                    },
                  ],
              calls,
            });

            return newContractCallOps;
          }
        }
        return prevContractCallOps;
      }, prevOutputCallOps as Operation[]);

      return newCallOps;
    }

    return prevOutputCallOps;
  }, [] as Operation[]);

  return contractCallOperations;
}

/** @hidden */
export function getTransferOperations({
  inputs,
  outputs,
  receipts,
}: GetTransferOperationsParams): Operation[] {
  const coinOutputs = getOutputsCoin(outputs);

  const [transferReceipt] = getReceiptsByType<TransactionResultTransferReceipt>(
    receipts,
    ReceiptType.Transfer
  );

  let operations: Operation[] = [];

  // Possible transfer to contract
  if (transferReceipt) {
    const changeOutputs = getOutputsChange(outputs);
    changeOutputs.forEach((output) => {
      const { assetId } = output;
      const [contractInput] = getInputsContract(inputs);
      const utxo = getInputFromAssetId(inputs, assetId);

      if (utxo && contractInput) {
        const inputAddress = getInputAccountAddress(utxo);
        operations = addOperation(operations, {
          name: OperationName.transfer,
          from: {
            type: AddressType.account,
            address: inputAddress,
          },
          to: {
            type: AddressType.contract,
            address: contractInput.contractID,
          },
          assetsSent: [
            {
              assetId: assetId.toString(),
              amount: transferReceipt.amount,
            },
          ],
        });
      }
    });
  } else {
    coinOutputs.forEach((output) => {
      const input = getInputFromAssetId(inputs, output.assetId);
      if (input) {
        const inputAddress = getInputAccountAddress(input);

        const operationToAdd: Operation = {
          name: OperationName.transfer,
          from: {
            type: AddressType.account,
            address: inputAddress,
          },
          to: {
            type: AddressType.account,
            address: output.to.toString(),
          },
          assetsSent: [
            {
              assetId: output.assetId.toString(),
              amount: output.amount,
            },
          ],
        };

        operations = addOperation(operations, operationToAdd);
      }
    });
  }

  return operations;
}

/** @hidden */
export function getPayProducerOperations(outputs: Output[]): Operation[] {
  const coinOutputs = getOutputsCoin(outputs);
  const payProducerOperations = coinOutputs.reduce((prev, output) => {
    const operations = addOperation(prev, {
      name: OperationName.payBlockProducer,
      from: {
        type: AddressType.account,
        address: 'Network',
      },
      to: {
        type: AddressType.account,
        address: output.to.toString(),
      },
      assetsSent: [
        {
          assetId: output.assetId.toString(),
          amount: output.amount,
        },
      ],
    });

    return operations;
  }, [] as Operation[]);

  return payProducerOperations;
}

/** @hidden */
export function getContractCreatedOperations({ inputs, outputs }: InputOutputParam): Operation[] {
  const contractCreatedOutputs = getOutputsContractCreated(outputs);
  const input = getInputsCoin(inputs)[0];
  const fromAddress = getInputAccountAddress(input);
  const contractCreatedOperations = contractCreatedOutputs.reduce((prev, contractCreatedOutput) => {
    const operations = addOperation(prev, {
      name: OperationName.contractCreated,
      from: {
        type: AddressType.account,
        address: fromAddress,
      },
      to: {
        type: AddressType.contract,
        address: contractCreatedOutput?.contractId || '',
      },
    });

    return operations;
  }, [] as Operation[]);

  return contractCreatedOperations;
}

/** @hidden */
export function getOperations({
  transactionType,
  inputs,
  outputs,
  receipts,
  abiMap,
  rawPayload,
  maxInputs,
}: GetOperationParams): Operation[] {
  if (isTypeCreate(transactionType)) {
    return [
      ...getContractCreatedOperations({ inputs, outputs }),
      ...getTransferOperations({ inputs, outputs, receipts }),
    ];
  }

  if (isTypeScript(transactionType)) {
    return [
      ...getTransferOperations({ inputs, outputs, receipts }),
      ...getContractCallOperations({
        inputs,
        outputs,
        receipts,
        abiMap,
        rawPayload,
        maxInputs,
      }),
      ...getContractTransferOperations({ receipts }),
      ...getWithdrawFromFuelOperations({ inputs, receipts }),
    ];
  }
  // at this point we are sure it's a mint transaction
  return [...getPayProducerOperations(outputs)];
}
