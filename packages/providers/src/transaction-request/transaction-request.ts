import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Transaction } from '@fuel-ts/transactions';
import { TransactionType } from '@fuel-ts/transactions';

import type { TransactionRequestInput } from './input';
import { inputify } from './input';
import type { TransactionRequestOutput } from './output';
import { outputify } from './output';
import type { TransactionRequestStorageSlot } from './storage-slot';
import { storageSlotify } from './storage-slot';
import type { TransactionRequestWitness } from './witness';
import { witnessify } from './witness';

export { TransactionType };

export type ScriptTransactionRequest = {
  type: TransactionType.Script;
  /** Gas price for transaction */
  gasPrice: BigNumberish;
  /** Gas limit for transaction */
  gasLimit: BigNumberish;
  /** Price per transaction byte */
  bytePrice: BigNumberish;
  /** Block until which tx cannot be included */
  maturity?: BigNumberish;
  /** Script to execute */
  script?: BytesLike;
  /** Script input data (parameters) */
  scriptData?: BytesLike;
  /** List of inputs */
  inputs?: TransactionRequestInput[];
  /** List of outputs */
  outputs?: TransactionRequestOutput[];
  /** List of witnesses */
  witnesses?: TransactionRequestWitness[];
};
export type CreateTransactionRequest = {
  type: TransactionType.Create;
  /** Gas price for transaction */
  gasPrice: BigNumberish;
  /** Gas limit for transaction */
  gasLimit: BigNumberish;
  /** Price per transaction byte */
  bytePrice: BigNumberish;
  /** Block until which tx cannot be included */
  maturity?: BigNumberish;
  /** Witness index of contract bytecode to create */
  bytecodeWitnessIndex: BigNumberish;
  /** Salt */
  salt: BytesLike;
  /** List of static contracts */
  staticContracts?: BytesLike[];
  /** List of storage slots to initialize */
  storageSlots?: TransactionRequestStorageSlot[];
  /** List of inputs */
  inputs?: TransactionRequestInput[];
  /** List of outputs */
  outputs?: TransactionRequestOutput[];
  /** List of witnesses */
  witnesses?: TransactionRequestWitness[];
};
export type TransactionRequest = ScriptTransactionRequest | CreateTransactionRequest;

export const transactionFromRequest = (transactionRequest: TransactionRequest): Transaction => {
  // Process common fields
  const gasPrice = BigNumber.from(transactionRequest.gasPrice);
  const gasLimit = BigNumber.from(transactionRequest.gasLimit);
  const bytePrice = BigNumber.from(transactionRequest.bytePrice);
  const maturity = BigNumber.from(transactionRequest.maturity ?? 0);
  const inputs = transactionRequest.inputs?.map(inputify) ?? [];
  const outputs = transactionRequest.outputs?.map(outputify) ?? [];
  const witnesses = transactionRequest.witnesses?.map(witnessify) ?? [];
  const inputsCount = BigNumber.from(inputs.length);
  const outputsCount = BigNumber.from(outputs.length);
  const witnessesCount = BigNumber.from(witnesses.length);

  switch (transactionRequest.type) {
    case TransactionType.Script: {
      const script = arrayify(transactionRequest.script ?? '0x');
      const scriptData = arrayify(transactionRequest.scriptData ?? '0x');
      return {
        type: TransactionType.Script,
        gasPrice,
        gasLimit,
        bytePrice,
        maturity,
        scriptLength: BigNumber.from(script.length),
        scriptDataLength: BigNumber.from(scriptData.length),
        inputsCount,
        outputsCount,
        witnessesCount,
        receiptsRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
        script: hexlify(script),
        scriptData: hexlify(scriptData),
        inputs,
        outputs,
        witnesses,
      };
    }
    case TransactionType.Create: {
      const bytecodeWitnessIndex = BigNumber.from(transactionRequest.bytecodeWitnessIndex);
      const staticContracts = transactionRequest.staticContracts ?? [];
      const storageSlots = transactionRequest.storageSlots?.map(storageSlotify) ?? [];
      return {
        type: TransactionType.Create,
        gasPrice,
        gasLimit,
        bytePrice,
        maturity,
        bytecodeLength: witnesses[bytecodeWitnessIndex.toNumber()].dataLength.div(4),
        bytecodeWitnessIndex,
        staticContractsCount: BigNumber.from(staticContracts.length),
        storageSlotsCount: BigNumber.from(storageSlots.length),
        inputsCount,
        outputsCount,
        witnessesCount,
        salt: hexlify(transactionRequest.salt),
        staticContracts: staticContracts.map((id) => hexlify(id)),
        storageSlots,
        inputs,
        outputs,
        witnesses,
      };
    }
    default: {
      throw new Error('Not implemented');
    }
  }
};
