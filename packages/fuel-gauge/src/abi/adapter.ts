import { AbiCoder } from '@fuel-ts/abi';
import type { AbiCoderConfigurable, AbiCoderFunction, AbiSpecificationV1 } from '@fuel-ts/abi';
import type { Configurable } from '@fuel-ts/abi-coder/dist/types/JsonAbiNew';
import type { EncodingVersion } from '@fuel-ts/abi-coder/dist/utils/constants';
import type { BytesLike, DecodedValue, JsonAbi, FunctionFragment, InputValue } from 'fuels';
import { arrayify, Interface } from 'fuels';

const functionAdapter = (fn: AbiCoderFunction): FunctionFragment =>
  ({
    name: fn.name,
    signature: fn.signature,
    selector: fn.selector,
    selectorBytes: fn.selectorBytes,
    attributes: fn.attributes,

    encodeArguments: (values: InputValue[]): Uint8Array => fn.arguments.encode(values),
    decodeArguments: (data: BytesLike): (DecodedValue | undefined)[] => {
      const bytes = arrayify(data);
      return fn.arguments.decode(bytes) as (DecodedValue | undefined)[];
    },
    decodeOutput: (data: BytesLike): [DecodedValue | undefined, number] => {
      const bytes = arrayify(data);
      return [fn.output.decode(bytes) as DecodedValue | undefined, 0];
    },
    isReadOnly: () => {
      throw new Error('Not implemented');
    },

    // Unused
    // encoding: '1',
    // jsonFn: {} as unknown as FunctionFragment['jsonFn'],
    // jsonAbiOld: {} as unknown as JsonAbiOld,
    // jsonFnOld: {} as unknown as JsonAbiFunction,
  }) as unknown as FunctionFragment;

const configurableAdapter = (configurable: AbiCoderConfigurable): Configurable => ({
  name: configurable.name,
  offset: configurable.offset,

  // I don't think this is needed.
  concreteTypeId: -1,
});

export class InterfaceAdapter extends Interface {
  private coder: AbiCoder;
  functions: Record<string, FunctionFragment>;
  configurables: Record<string, Configurable>;
  jsonAbi: JsonAbi;
  encoding: EncodingVersion;

  constructor(jsonAbi: JsonAbi) {
    super(jsonAbi);
    this.coder = AbiCoder.fromAbi(jsonAbi as AbiSpecificationV1);

    this.functions = Object.fromEntries(
      Object.entries(this.coder.functions.functions).map(([name, fn]) => [
        name,
        functionAdapter(fn),
      ])
    );
    this.configurables = Object.fromEntries(
      Object.entries(this.coder.configurables.configurables).map(([name, configurable]) => [
        name,
        configurableAdapter(configurable),
      ])
    );
    this.jsonAbi = jsonAbi as unknown as JsonAbi;
    this.encoding = '1';
  }

  getFunction(nameOrSignatureOrSelector: string): FunctionFragment {
    let fn = this.coder.functions.findByName(nameOrSignatureOrSelector);
    if (fn) {
      return functionAdapter(fn);
    }

    fn = this.coder.functions.findBySelector(nameOrSignatureOrSelector);
    if (fn) {
      return functionAdapter(fn);
    }

    fn = this.coder.functions.findBySignature(nameOrSignatureOrSelector);
    if (fn) {
      return functionAdapter(fn);
    }

    throw new Error('Function not found');
  }

  decodeFunctionResult(
    fragment: FunctionFragment | string,
    data: BytesLike
  ): [DecodedValue | undefined, number] {
    const fn = typeof fragment === 'string' ? this.getFunction(fragment) : fragment;
    return fn.decodeOutput(data);
  }

  decodeLog(data: BytesLike, logId: string): [DecodedValue | undefined, number] {
    throw new Error('Not implemented');
  }

  encodeConfigurable(name: string, value: InputValue): Uint8Array {
    const coder = this.coder.configurables.findByName(name);
    return coder.value.encode(value);
  }

  encodeType(concreteTypeId: string, value: InputValue): Uint8Array {
    throw new Error('Not implemented');
  }

  decodeType(concreteTypeId: string, data: BytesLike): [DecodedValue | undefined, number] {
    throw new Error('Not implemented');
  }
}
