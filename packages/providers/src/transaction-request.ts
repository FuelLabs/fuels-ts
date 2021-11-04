import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Input, Output, Transaction, Witness } from '@fuel-ts/transactions';
import { TransactionType } from '@fuel-ts/transactions';

type ScriptTransactionRequest = {
  type: TransactionType.Script;
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  maturity: BigNumberish;
  script: BytesLike;
  scriptData: BytesLike;
  inputs: Input[];
  outputs: Output[];
  witnesses: Witness[];
};

type CreateTransactionRequest = {
  type: TransactionType.Create;
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  maturity: BigNumberish;
  bytecodeWitnessIndex: BigNumberish;
  salt: string;
  staticContracts: string[];
  inputs: Input[];
  outputs: Output[];
  witnesses: Witness[];
};

export type TransactionRequest = ScriptTransactionRequest | CreateTransactionRequest;

export const transactionFromRequest = (transactionRequest: TransactionRequest): Transaction => {
  switch (transactionRequest.type) {
    case TransactionType.Script: {
      const script = arrayify(transactionRequest.script);
      const scriptData = arrayify(transactionRequest.scriptData);
      const receiptsRoot = '0x0000000000000000000000000000000000000000000000000000000000000000';
      const inputs = transactionRequest.inputs;
      const outputs = transactionRequest.outputs;
      const witnesses = transactionRequest.witnesses;

      return {
        type: TransactionType.Script,
        data: {
          gasPrice: BigNumber.from(transactionRequest.gasPrice),
          gasLimit: BigNumber.from(transactionRequest.gasLimit),
          maturity: BigNumber.from(transactionRequest.maturity),
          scriptLength: BigNumber.from(script.length),
          scriptDataLength: BigNumber.from(scriptData.length),
          inputsCount: BigNumber.from(inputs.length),
          outputsCount: BigNumber.from(outputs.length),
          witnessesCount: BigNumber.from(witnesses.length),
          receiptsRoot,
          script: hexlify(script),
          scriptData: hexlify(scriptData),
          inputs,
          outputs,
          witnesses,
        },
      };
    }
    case TransactionType.Create: {
      const staticContracts = transactionRequest.staticContracts;
      const inputs = transactionRequest.inputs;
      const outputs = transactionRequest.outputs;
      const witnesses = transactionRequest.witnesses;
      const bytecodeWitnessIndex = BigNumber.from(transactionRequest.bytecodeWitnessIndex);
      const bytecodeLength = BigNumber.from(
        witnesses[bytecodeWitnessIndex.toNumber()].data.length / 4
      );

      return {
        type: TransactionType.Create,
        data: {
          gasPrice: BigNumber.from(transactionRequest.gasPrice),
          gasLimit: BigNumber.from(transactionRequest.gasLimit),
          maturity: BigNumber.from(transactionRequest.maturity),
          bytecodeLength,
          bytecodeWitnessIndex,
          staticContractsCount: BigNumber.from(staticContracts.length),
          inputsCount: BigNumber.from(inputs.length),
          outputsCount: BigNumber.from(outputs.length),
          witnessesCount: BigNumber.from(witnesses.length),
          salt: transactionRequest.salt,
          staticContracts,
          inputs,
          outputs,
          witnesses,
        },
      };
    }
    default: {
      throw new Error('Not implemented');
    }
  }
};
