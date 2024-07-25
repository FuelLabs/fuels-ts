import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { ReceiptType, TransactionType } from '@fuel-ts/transactions';
import type { InputContract, Output, OutputChange } from '@fuel-ts/transactions';

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
  getInputsContract,
  getInputsCoinAndMessage,
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
        ErrorCode.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${transactionType}.`
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
export function isTypeUpgrade(transactionType: TransactionType) {
  return isType(transactionType, TransactionTypeName.Upgrade);
}

/** @hidden */
export function isTypeUpload(transactionType: TransactionType) {
  return isType(transactionType, TransactionTypeName.Upload);
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
export function getWithdrawFromFuelOperations({
  inputs,
  receipts,
  baseAssetId,
}: InputParam & ReceiptParam & { baseAssetId: string }): Operation[] {
  const messageOutReceipts = getReceiptsMessageOut(receipts);

  const withdrawFromFuelOperations = messageOutReceipts.reduce(
    (prevWithdrawFromFuelOps, receipt) => {
      const input = getInputFromAssetId(inputs, baseAssetId, true);
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
              assetId: baseAssetId,
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
  baseAssetId,
}: InputOutputParam &
  ReceiptParam &
  Pick<GetOperationParams, 'abiMap' | 'maxInputs' | 'baseAssetId'> &
  RawPayloadParam): Operation[] {
  const contractCallReceipts = getReceiptsCall(receipts);
  const contractOutputs = getOutputsContract(outputs);

  const contractCallOperations = contractOutputs.reduce((prevOutputCallOps, output) => {
    const contractInput = getInputContractFromIndex(inputs, output.inputIndex);

    if (contractInput) {
      const newCallOps = contractCallReceipts.reduce((prevContractCallOps, receipt) => {
        if (receipt.to === contractInput.contractID) {
          // # TODO: This is a temporary fix to ensure that the base assetId is used when the assetId is ZeroBytes32
          // The assetId is returned as ZeroBytes32 if the contract call has no assets in it (see https://github.com/FuelLabs/fuel-core/issues/1941)
          const assetId = receipt.assetId === ZeroBytes32 ? baseAssetId : receipt.assetId;
          const input = getInputFromAssetId(inputs, assetId, assetId === baseAssetId);
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
function extractTransferOperationFromReceipt(
  receipt: TransactionResultTransferReceipt | TransactionResultTransferOutReceipt,
  contractInputs: InputContract[],
  changeOutputs: OutputChange[]
) {
  const { to: toAddress, assetId, amount } = receipt;
  let { from: fromAddress } = receipt;

  const toType = contractInputs.some((input) => input.contractID === toAddress)
    ? AddressType.contract
    : AddressType.account;

  if (ZeroBytes32 === fromAddress) {
    const change = changeOutputs.find((output) => output.assetId === assetId);

    fromAddress = change?.to || fromAddress;
  }

  const fromType = contractInputs.some((input) => input.contractID === fromAddress)
    ? AddressType.contract
    : AddressType.account;

  return {
    name: OperationName.transfer,
    from: {
      type: fromType,
      address: fromAddress,
    },
    to: {
      type: toType,
      address: toAddress,
    },
    assetsSent: [
      {
        assetId: assetId.toString(),
        amount,
      },
    ],
  };
}

/** @hidden */
export function getTransferOperations({
  inputs,
  outputs,
  receipts,
}: GetTransferOperationsParams): Operation[] {
  let operations: Operation[] = [];

  const coinOutputs = getOutputsCoin(outputs);
  const contractInputs = getInputsContract(inputs);
  const changeOutputs = getOutputsChange(outputs);

  /**
   * Extracting transfer operations between wallets, as they do not produce receipts
   */
  coinOutputs.forEach((output) => {
    const { amount, assetId, to } = output;

    const changeOutput = changeOutputs.find((change) => change.assetId === assetId);

    if (changeOutput) {
      operations = addOperation(operations, {
        name: OperationName.transfer,
        from: {
          type: AddressType.account,
          address: changeOutput.to,
        },
        to: {
          type: AddressType.account,
          address: to,
        },
        assetsSent: [
          {
            assetId,
            amount,
          },
        ],
      });
    }
  });

  /**
   * `Transfer` receipts are produced from transfers:
   * - Wallet to Contract
   * - Contract to Contract
   */
  const transferReceipts = getReceiptsByType<TransactionResultTransferReceipt>(
    receipts,
    ReceiptType.Transfer
  );

  /**
   * `TransferOut` receipts are produced from transfer:
   * - Contract to Wallet
   */
  const transferOutReceipts = getReceiptsByType<TransactionResultTransferOutReceipt>(
    receipts,
    ReceiptType.TransferOut
  );

  [...transferReceipts, ...transferOutReceipts].forEach((receipt) => {
    const operation = extractTransferOperationFromReceipt(receipt, contractInputs, changeOutputs);

    operations = addOperation(operations, operation);
  });

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
  const input = getInputsCoinAndMessage(inputs)[0];
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
  baseAssetId,
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
        baseAssetId,
      }),
      ...getWithdrawFromFuelOperations({ inputs, receipts, baseAssetId }),
    ];
  }
  // at this point we are sure it's a mint transaction
  return [...getPayProducerOperations(outputs)];
}
