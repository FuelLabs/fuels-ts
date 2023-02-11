import type { BytesLike } from '@ethersproject/bytes';
import type { FunctionFragment, InputValue, Interface } from '@fuel-ts/abi-coder';
import type { BN } from '@fuel-ts/math';
import type {
  BuildScriptOptions,
  CoinQuantityLike,
  Provider,
  TransactionResponse,
  TransactionResult,
} from '@fuel-ts/providers';
import { ScriptTransactionRequest } from '@fuel-ts/providers';
import { MAX_GAS_PER_TX } from '@fuel-ts/transactions';
import type { BaseWalletLocked } from '@fuel-ts/wallet';

import { FunctionInvocationScope } from './functions/invocation-scope';
import type { ScriptRequest } from './script-request';

type Result<T> = {
  value: T | BN | undefined;
  logs: unknown[];
};

type InvokeMain<TArgs extends Array<any> = Array<any>, TReturn = any> = (
  ...args: TArgs
) => FunctionInvocationScope<TArgs, TReturn>;

export class Script<TInput extends Array<any>, TOutput> {
  bytecode: BytesLike;
  interface: Interface;
  wallet: BaseWalletLocked | null;
  script!: ScriptRequest<InputValue<void>[], Result<TOutput>>;
  provider: Provider;
  functions: { main: InvokeMain<TInput, TOutput> };

  constructor(
    bytecode: BytesLike,
    scriptInterface: Interface,
    provider: Provider,
    wallet: BaseWalletLocked | null
  ) {
    this.bytecode = bytecode;
    this.interface = scriptInterface;

    this.provider = provider;
    this.wallet = wallet;

    this.functions = {
      main: (...args: TInput) =>
        new FunctionInvocationScope(this, this.interface.getFunction('main'), args),
    };
  }

  buildFunction(func: FunctionFragment) {
    return (...args: Array<unknown>) => new FunctionInvocationScope(this, func, args);
  }

  async buildScriptTransaction(
    data: InputValue<TInput>[],
    scriptOptions?: BuildScriptOptions
  ): Promise<ScriptTransactionRequest> {
    const options = {
      fundTransaction: true,
      ...scriptOptions,
    };
    const request = new ScriptTransactionRequest({
      gasLimit: MAX_GAS_PER_TX,
      ...options,
    });
    request.setScript(this.script, data as InputValue[]);

    const requiredCoinQuantities: CoinQuantityLike[] = [];
    if (options.fundTransaction) {
      requiredCoinQuantities.push(request.calculateFee());
    }

    if (requiredCoinQuantities.length && this.wallet) {
      const resources = await this.wallet.getResourcesToSpend(requiredCoinQuantities);
      request.addResources(resources);
    }

    return request;
  }

  async call(
    data: InputValue<TInput>[],
    options?: BuildScriptOptions
  ): Promise<
    {
      transactionResult: TransactionResult<'success' | 'failure'>;
      response: TransactionResponse;
    } & Result<TOutput>
  > {
    const request = await this.buildScriptTransaction(data, options);
    const response = await this.provider.sendTransaction(request);
    const transactionResult = await response.waitForResult();
    const result = this.script.decodeCallResult(transactionResult);

    return {
      transactionResult,
      response,
      value: result.value,
      logs: result.logs,
    };
  }
}
