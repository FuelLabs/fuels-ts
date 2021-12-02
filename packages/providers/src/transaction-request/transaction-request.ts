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
import type { TransactionRequestWitness } from './witness';
import { witnessify } from './witness';

export type ScriptTransactionRequest = {
  type: TransactionType.Script;
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  maturity?: BigNumberish;
  script: BytesLike;
  scriptData: BytesLike;
  inputs?: TransactionRequestInput[];
  outputs?: TransactionRequestOutput[];
  witnesses?: TransactionRequestWitness[];
};
export type CreateTransactionRequest = {
  type: TransactionType.Create;
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  maturity?: BigNumberish;
  bytecodeWitnessIndex: BigNumberish;
  salt: string;
  staticContracts?: string[];
  inputs?: TransactionRequestInput[];
  outputs?: TransactionRequestOutput[];
  witnesses?: TransactionRequestWitness[];
};
export type TransactionRequest = ScriptTransactionRequest | CreateTransactionRequest;

export const transactionFromRequest = (transactionRequest: TransactionRequest): Transaction => {
  // Process common fields
  const gasPrice = BigNumber.from(transactionRequest.gasPrice);
  const gasLimit = BigNumber.from(transactionRequest.gasLimit);
  const maturity = BigNumber.from(transactionRequest.maturity ?? 0);
  const inputs = transactionRequest.inputs?.map(inputify) ?? [];
  const outputs = transactionRequest.outputs?.map(outputify) ?? [];
  const witnesses = transactionRequest.witnesses?.map(witnessify) ?? [];
  const inputsCount = BigNumber.from(inputs.length);
  const outputsCount = BigNumber.from(outputs.length);
  const witnessesCount = BigNumber.from(witnesses.length);

  switch (transactionRequest.type) {
    case TransactionType.Script: {
      const script = arrayify(transactionRequest.script);
      const scriptData = arrayify(transactionRequest.scriptData);
      return {
        type: TransactionType.Script,
        gasPrice,
        gasLimit,
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
      const staticContracts = transactionRequest.staticContracts ?? [];
      const bytecodeWitnessIndex = BigNumber.from(transactionRequest.bytecodeWitnessIndex);
      return {
        type: TransactionType.Create,
        gasPrice,
        gasLimit,
        maturity,
        bytecodeLength: witnesses[bytecodeWitnessIndex.toNumber()].dataLength.div(4),
        bytecodeWitnessIndex,
        staticContractsCount: BigNumber.from(staticContracts.length),
        inputsCount,
        outputsCount,
        witnessesCount,
        salt: transactionRequest.salt,
        staticContracts,
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
