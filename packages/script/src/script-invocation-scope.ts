/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Provider } from '@fuel-ts/account';
import { FuelError } from '@fuel-ts/errors';
import { ScriptRequest, FunctionInvocationScope } from '@fuel-ts/program';

import type { AbstractScript } from './types';

export class ScriptInvocationScope<
  TArgs extends Array<any> = Array<any>,
  TReturn = any,
> extends FunctionInvocationScope<TArgs, TReturn> {
  scriptRequest!: ScriptRequest<TArgs, TReturn>;

  protected override async updateScriptRequest() {
    if (!this.scriptRequest) {
      await this.buildScriptRequest();
    }

    this.transactionRequest.setScript(this.scriptRequest, this.args);
  }

  private async buildScriptRequest() {
    const programBytes = (this.program as AbstractScript).bytes;
    const chainInfoCache = await (this.program.provider as Provider).getChain();

    // TODO: Remove this error since it is already handled on Provider class
    if (!chainInfoCache) {
      throw new FuelError(
        FuelError.CODES.CHAIN_INFO_CACHE_EMPTY,
        'Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `new Provider()`'
      );
    }

    this.scriptRequest = new ScriptRequest(
      programBytes,
      (args: TArgs) => this.func.encodeArguments(args),
      () => [] as unknown as TReturn
    );
  }
}
