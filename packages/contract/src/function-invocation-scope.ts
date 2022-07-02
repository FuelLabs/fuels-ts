/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FunctionFragment, InputValue } from '@fuel-ts/abi-coder';
import { toBigInt } from '@fuel-ts/math';
import type { CoinQuantity, CoinQuantityLike } from '@fuel-ts/providers';
import {
  transactionRequestify,
  coinQuantityfy,
  ScriptTransactionRequest,
} from '@fuel-ts/providers';
import type { Provider } from 'fuels';

import type Contract from './contract-new';
import { FunctionCallResult, FunctionInvocationResult } from './function-invocation-results';
import { contractCallScript } from './scripts';
import type { CallOptions, CallParams, TxParams } from './types';

export class FunctionInvocationScope {
  transactionRequest: ScriptTransactionRequest;
  private func: FunctionFragment;
  private contract: Contract;
  private callParameters?: CallParams;
  private txParameters?: TxParams;
  private forward?: CoinQuantity;
  private args: Array<unknown> = [];

  constructor(contract: Contract, func: FunctionFragment, args: Array<unknown>) {
    this.func = func;
    this.contract = contract;
    this.transactionRequest = new ScriptTransactionRequest({
      gasLimit: 1000000,
    });
    this.transactionRequest.addContract(this.contract);
    this.setArguments(args);
  }

  getCallConfig() {
    return {
      func: this.func,
      contract: this.contract,
      callParameters: this.callParameters,
      txParameters: this.txParameters,
      forward: this.forward,
      args: this.args,
    };
  }

  setArguments(args: Array<unknown>) {
    this.args = args || [];

    // Set data on transactionRequest
    const data = this.contract.interface.encodeFunctionData(
      this.func,
      this.args as Array<InputValue>
    );
    this.transactionRequest.setScript(contractCallScript, [
      {
        contractId: this.contract.id,
        data,
        assetId: this.forward?.assetId,
        amount: this.forward?.amount,
        gas: this.txParameters?.gasLimit,
      },
    ]);

    return this;
  }

  async addRequiredCoins() {
    const coinsOnTransaction = [this.forward, [1]].filter((i) => !!i) as CoinQuantityLike[];
    const coins = await this.contract.wallet?.getCoinsToSpend(coinsOnTransaction);
    this.transactionRequest.addCoins(coins || []);
    return this;
  }

  callParams(callParams: CallParams) {
    this.callParameters = callParams;

    if (callParams?.forward) {
      this.forward = coinQuantityfy(callParams.forward);
      // Update transaction script with new forward params
      this.setArguments(this.args);
    }

    return this;
  }

  txParams(txParams: TxParams) {
    this.txParameters = txParams;
    const request = this.transactionRequest;

    request.gasLimit = toBigInt(txParams.gasLimit || request.gasLimit);
    request.gasPrice = toBigInt(txParams.gasPrice || request.gasPrice);
    request.bytePrice = toBigInt(txParams.bytePrice || request.bytePrice);
    request.addVariableOutputs(this.txParameters?.variableOutputs || 0);

    // Update transaction script with new forward params
    this.setArguments(this.args);

    return this;
  }

  private static getCallOptions(options?: CallOptions) {
    return { fundTransaction: true, returnResult: false, ...options };
  }

  async call<T = any>(options?: CallOptions): Promise<FunctionInvocationResult<T>> {
    const opts = FunctionInvocationScope.getCallOptions(options);
    if (!this.contract.wallet) {
      throw new Error('Wallet is required!');
    }
    if (opts.fundTransaction) {
      await this.addRequiredCoins();
    }
    const response = await this.contract.wallet?.sendTransaction(this.transactionRequest);
    const result = await FunctionInvocationResult.build<T>(this, response);

    return result;
  }

  async simulate<T = any>(options?: CallOptions): Promise<FunctionCallResult<T>> {
    const opts = FunctionInvocationScope.getCallOptions(options);
    if (!this.contract.wallet) {
      throw new Error('Wallet is required!');
    }
    if (opts.fundTransaction) {
      await this.addRequiredCoins();
    }
    const response = await this.contract.wallet.simulateTransaction(this.transactionRequest);
    const result = await FunctionCallResult.build<T>(this, response);

    return result;
  }

  async get<T = any>(): Promise<FunctionCallResult<T>> {
    if (!this.contract.wallet && !this.contract.provider) {
      throw new Error('Wallet or Provider is required!');
    }
    const provider = (this.contract.wallet?.provider || this.contract.provider) as Provider;
    const request = transactionRequestify(this.transactionRequest);
    const response = await provider.call(request, {
      utxoValidation: false,
    });
    const result = await FunctionCallResult.build<T>(this, response);

    return result;
  }
}
