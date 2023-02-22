import type { AbstractScript } from '@fuel-ts/interfaces';
import {
  ScriptRequest,
  assert,
  FunctionInvocationScope,
  FunctionInvocationResult,
} from '@fuel-ts/program';
import type { CallOptions, InvocationScopeLike } from '@fuel-ts/program';

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
    this.scriptRequest = new ScriptRequest(
      (this.program as AbstractScript).bytes,
      (args: TArgs) => this.program.interface.encodeFunctionData(this.func, args, 0, true),
      () => [] as unknown as TReturn
    );
  }

  /**
   * Submits a script transaction to the blockchain.
   */
  async call<T = TReturn>(options?: CallOptions): Promise<FunctionInvocationResult<T>> {
    assert(this.program.account, 'Provider is required!');

    const transactionRequest = await this.getTransactionRequest(options);
    const response = await this.program.account.sendTransaction(transactionRequest);

    return FunctionInvocationResult.build<T>(
      this as unknown as InvocationScopeLike,
      response,
      false,
      this.program
    );
  }
}
