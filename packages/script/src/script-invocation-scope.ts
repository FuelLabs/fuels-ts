/* eslint-disable @typescript-eslint/no-explicit-any */
import { FuelError } from '@fuel-ts/errors';
import type { AbstractScript } from '@fuel-ts/interfaces';
import { ScriptRequest, FunctionInvocationScope } from '@fuel-ts/program';
import type { Provider } from '@fuel-ts/providers';
import { ByteArrayCoder } from '@fuel-ts/transactions';

export class ScriptInvocationScope<
  TArgs extends Array<any> = Array<any>,
  TReturn = any,
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
    const chainInfoCache = (this.program.provider as Provider).getChain();

    if (!chainInfoCache) {
      throw new FuelError(
        FuelError.CODES.CHAIN_INFO_CACHE_EMPTY,
        'Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()`'
      );
    }

    const maxInputs = chainInfoCache.consensusParameters.maxInputs.toNumber();

    const byteLength = new ByteArrayCoder(programBytes.length).encodedLength;
    this.scriptRequest = new ScriptRequest(
      programBytes,
      (args: TArgs) =>
        this.func.encodeArguments(
          args,
          ScriptRequest.getScriptDataOffsetWithScriptBytes(byteLength, maxInputs)
        ),
      () => [] as unknown as TReturn
    );
  }
}
