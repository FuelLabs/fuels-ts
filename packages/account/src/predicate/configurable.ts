import { BigNumberCoder } from '@fuel-ts/abi-coder';
import type { InputValue, Interface } from '@fuel-ts/abi-coder';
import type { Configurable } from '@fuel-ts/abi-coder/dist/types/JsonAbiNew';
import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { getBytecodeDataOffset } from '../utils/predicate-script-loader-instructions';

export const createConfigurables = (opts: { bytecode: Uint8Array; abi: Interface }) => {
  const { abi } = opts;
  const bytecode = new Uint8Array(opts.bytecode);
  const bytecodeDataOffset = getBytecodeDataOffset(bytecode);
  const dynamicOffsetCoder = new BigNumberCoder('u64');

  const getConfigurable = (name: string) => {
    const configurable = abi.configurables[name];
    if (!configurable) {
      throw new FuelError(
        ErrorCode.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${name}' was not found in the ABI.`
      );
    }
    return configurable;
  };

  /**
   * Readers
   */
  const readDirect = ({ name, concreteTypeId, offset }: Configurable) => {
    const coder = abi.getCoder(concreteTypeId);
    const [value] = coder.decode(bytecode, offset);
    return { name, value };
  };

  const readIndirect = ({ name, concreteTypeId, offset }: Configurable) => {
    // Find the actual offset of the dynamic value
    const [dynamicOffsetBn] = dynamicOffsetCoder.decode(bytecode, offset);
    const dynamicOffset = bytecodeDataOffset + dynamicOffsetBn.toNumber();

    // Read the dynamic value
    const coder = abi.getCoder(concreteTypeId);
    const [value] = coder.decode(bytecode, dynamicOffset);
    return { name, value };
  };

  const read = (name: string) => {
    const configurable = getConfigurable(name);
    const reader = configurable.indirect ? readIndirect : readDirect;
    return reader(configurable);
  };

  /**
   * Writers
   */
  const writeDirect = (
    bytes: Uint8Array,
    { name, offset }: Configurable,
    value: InputValue
  ): Uint8Array => {
    const encodedValue = abi.encodeConfigurable(name, value);
    bytes.set(encodedValue, offset);
    return bytes;
  };

  const writeIndirect = (
    bytes: Uint8Array,
    { name, concreteTypeId, offset }: Configurable,
    value: InputValue
  ): Uint8Array => {
    const test = true;
    return bytes;
  };

  const write = (bytes: Uint8Array, name: string, value: InputValue) => {
    const configurable = getConfigurable(name);
    const writer = configurable.indirect ? writeIndirect : writeDirect;
    return writer(bytes, configurable, value);
  };

  return {
    all: () => Object.keys(abi.configurables).map(read),
    set: (configurableValues: Record<string, InputValue>) => {
      Object.entries(configurableValues).forEach(([name, value]) => {
        write(bytecode, name, value);
      });
      return bytecode;
    },
  };
};
