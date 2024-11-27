import { AbiCoder } from '@fuel-ts/abi';
import type { AbiCoderConfigurable, AbiCoderFunction, AbiSpecificationV1 } from '@fuel-ts/abi';
import type { Configurable } from '@fuel-ts/abi-coder/dist/types/JsonAbiNew';
import type { EncodingVersion } from '@fuel-ts/abi-coder/dist/utils/constants';
import type { BytesLike, DecodedValue, JsonAbi, FunctionFragment, InputValue } from 'fuels';
import { Interface } from 'fuels';

const functionAdapter = (fn: AbiCoderFunction): FunctionFragment =>
  ({
    name: fn.name,
    signature: fn.signature,
    selector: fn.selector,
    selectorBytes: fn.selectorBytes,
    attributes: fn.attributes,

    encodeArguments: (values: InputValue[]): Uint8Array => fn.encodeArguments(values),
    decodeArguments: (data: BytesLike): (DecodedValue | undefined)[] =>
      fn.decodeArguments(data) as (DecodedValue | undefined)[],
    decodeOutput: (data: BytesLike): [DecodedValue | undefined, number] => [
      fn.decodeOutput(data) as DecodedValue | undefined,
      0,
    ],
    isReadOnly: fn.isReadOnly,

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
  override functions: Record<string, FunctionFragment>;
  override configurables: Record<string, Configurable>;
  override jsonAbi: JsonAbi;
  override encoding: EncodingVersion;

  constructor(jsonAbi: JsonAbi) {
    super(jsonAbi);
    this.coder = AbiCoder.fromAbi(jsonAbi as AbiSpecificationV1);

    this.functions = Object.fromEntries(
      Object.entries(this.coder.functions).map(([name, fn]) => [name, functionAdapter(fn)])
    );
    this.configurables = Object.fromEntries(
      Object.entries(this.coder.configurables).map(([name, configurable]) => [
        name,
        configurableAdapter(configurable),
      ])
    );
    this.jsonAbi = jsonAbi as unknown as JsonAbi;
    this.encoding = '1';
  }

  override getFunction(nameOrSignatureOrSelector: string): FunctionFragment {
    const fn = this.coder.getFunction(nameOrSignatureOrSelector);
    return functionAdapter(fn);
  }

  override decodeFunctionResult(
    fragment: FunctionFragment | string,
    data: BytesLike
  ): [DecodedValue | undefined, number] {
    const fn = typeof fragment === 'string' ? this.getFunction(fragment) : fragment;
    return fn.decodeOutput(data);
  }

  override decodeLog(data: BytesLike, logId: string): [DecodedValue | undefined, number] {
    const log = this.coder.getLog(logId);
    const decoded = log.decode(data);
    return [decoded as DecodedValue | undefined, -1];
  }

  override encodeConfigurable(name: string, value: InputValue): Uint8Array {
    const coder = this.coder.getConfigurable(name);
    return coder.encode(value);
  }

  override encodeType(concreteTypeId: string, value: InputValue): Uint8Array {
    throw new Error('Not implemented');
  }

  override decodeType(concreteTypeId: string, data: BytesLike): [DecodedValue | undefined, number] {
    throw new Error('Not implemented');
  }
}
