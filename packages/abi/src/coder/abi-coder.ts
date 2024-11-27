import { FuelError } from '@fuel-ts/errors';

import type { Matcher } from '../matchers/sway-type-matchers';
import type { Abi, AbiSpecification } from '../parser';
import { AbiParser } from '../parser';

import type { AbiCoderConfigurable, AbiCoderFunction, AbiCoderLog } from './abi-coder-types';
import { AbiEncoding } from './encoding/encoding';
import { makeConfigurable } from './utils/createConfigurable';
import { makeFunction } from './utils/createFunction';
import { makeLog } from './utils/createLog';

export class AbiCoder {
  // Internal properties
  private abi: Abi;
  private encoding: AbiEncoding;

  // Exposed properties
  public readonly functions: Record<string, AbiCoderFunction>;
  public readonly configurables: Record<string, AbiCoderConfigurable>;
  public readonly logs: Record<string, AbiCoderLog>;

  private constructor(abi: AbiSpecification) {
    this.abi = AbiParser.parse(abi);
    this.encoding = AbiEncoding.from(this.abi.encodingVersion);

    const { functions, configurables, loggedTypes } = this.abi;
    this.functions = Object.fromEntries(
      functions.map((fn) => [fn.name, makeFunction(fn, this.encoding)])
    );
    this.configurables = Object.fromEntries(
      configurables.map((conf) => [conf.name, makeConfigurable(conf, this.encoding)])
    );
    this.logs = Object.fromEntries(
      loggedTypes.map((log) => [log.logId, makeLog(log, this.encoding)])
    );
  }

  static fromAbi(abi: AbiSpecification): AbiCoder {
    return new AbiCoder(abi);
  }

  public getFunction(nameOrSignatureOrSelector: string): AbiCoderFunction {
    const fn = Object.values<AbiCoderFunction>(this.functions).find(
      (f) =>
        f.name === nameOrSignatureOrSelector ||
        f.signature === nameOrSignatureOrSelector ||
        f.selector === nameOrSignatureOrSelector
    );

    if (fn === undefined) {
      throw new FuelError(
        FuelError.CODES.FUNCTION_NOT_FOUND,
        `Unable to find function with the name or signature or selector of "${nameOrSignatureOrSelector}".`
      );
    }

    return fn;
  }

  public getConfigurable(name: string): AbiCoderConfigurable {
    const configurable = this.configurables[name];
    if (configurable === undefined) {
      throw new FuelError(
        FuelError.CODES.CONFIGURABLE_NOT_FOUND,
        `Configurable with name '${name}' doesn't exist in the ABI.`
      );
    }

    return configurable;
  }

  public getLog(logId: string): AbiCoderLog {
    const log = this.logs[logId];
    if (log === undefined) {
      throw new FuelError(
        FuelError.CODES.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${logId}' doesn't exist in the ABI.`
      );
    }

    return log;
  }
}
