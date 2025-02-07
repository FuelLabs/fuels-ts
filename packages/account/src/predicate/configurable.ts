import { BigNumberCoder, type Interface } from '@fuel-ts/abi-coder';
import type { Configurable } from '@fuel-ts/abi-coder/dist/types/JsonAbiNew';
import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { getBytecodeDataOffset } from '../utils/predicate-script-loader-instructions';

export const createConfigurables = (opts: { bytecode: Uint8Array; abi: Interface }) => {
  const { bytecode, abi } = opts;
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

  return {
    all: () => Object.keys(abi.configurables).map(read),
  };
};
