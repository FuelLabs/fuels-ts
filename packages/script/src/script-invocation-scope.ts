/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AbstractScript } from '@fuel-ts/interfaces';
import {
  ScriptRequest,
  assert,
  FunctionInvocationScope,
  FunctionInvocationResult,
} from '@fuel-ts/program';
import type { InvocationScopeLike } from '@fuel-ts/program';
import type { Provider } from '@fuel-ts/providers';

export class ScriptInvocationScope<
  TArgs extends Array<any> = Array<any>,
  TReturn = any
> extends FunctionInvocationScope<TArgs, TReturn> {
  scriptRequest!: ScriptRequest<TArgs, TReturn>;

  protected updateScriptRequest() {
    if (!this.scriptRequest) {
      this.buildScriptRequest();
    }

    this.transactionRequest.setScript(this.scriptRequest, this.args);
  }

  private buildScriptRequest() {
    const programBytes = (this.program as AbstractScript).bytes;
    const consensusParamsCache = (this.program.provider as Provider).consensusParamsCache;

    if (!consensusParamsCache) {
      throw new Error('Provider must have consensus params cache');
    }

    const maxInputs = consensusParamsCache.maxInputs.toNumber();

    this.scriptRequest = new ScriptRequest(
      programBytes,
      (args: TArgs) =>
        this.func.encodeArguments(
          args,
          ScriptRequest.getScriptDataOffsetWithBytes(programBytes, maxInputs)
        ),
      () => [] as unknown as TReturn
    );
  }

  /**
   * Submits a script transaction to the blockchain.
   */
  async call<T = TReturn>(): Promise<FunctionInvocationResult<T>> {
    assert(this.program.account, 'Provider is required!');

    const transactionRequest = await this.getTransactionRequest();
    const response = await this.program.account.sendTransaction(transactionRequest);

    return FunctionInvocationResult.build<T>(
      this as unknown as InvocationScopeLike,
      response,
      false,
      this.program
    );
  }
}
