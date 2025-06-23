import { BigNumberCoder } from '@fuel-ts/abi-coder';
import type { InputValue, Interface } from '@fuel-ts/abi-coder';
import type { Configurable } from '@fuel-ts/abi-coder/dist/types/JsonAbiNew';
import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { extractBlobIdAndDataOffset } from './predicate-script-loader-instructions';

export const createConfigurables = (opts: { bytecode: Uint8Array; abi: Interface }) => {
  const { abi } = opts;
  let bytecode = new Uint8Array(opts.bytecode);
  const configurables = Object.values(abi.configurables);
  const { dataOffset } = extractBlobIdAndDataOffset(bytecode);
  const dynamicOffsetCoder = new BigNumberCoder('u64');

  const getConfigurable = (name: string) => {
    const configurable = configurables.find((conf) => conf.name === name);
    if (!configurable) {
      throw new FuelError(
        ErrorCode.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${name}' was not found in the ABI.`
      );
    }
    return configurable;
  };

  const readIndirectOffset = ({ offset }: Pick<Configurable, 'offset'>) => {
    const [dynamicOffsetBn] = dynamicOffsetCoder.decode(bytecode, offset);
    const dynamicOffset = dataOffset + dynamicOffsetBn.toNumber();
    return dynamicOffset;
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
    const dynamicOffset = readIndirectOffset({ offset });
    const coder = abi.getCoder(concreteTypeId);
    const [value] = coder.decode(bytecode, dynamicOffset);
    return { name, value };
  };

  const read = (configurable: Configurable) => {
    const reader = configurable.indirect ? readIndirect : readDirect;
    return reader(configurable);
  };

  /**
   * Writers
   */
  const writeDirect = ({ name, offset }: Configurable, value: InputValue) => {
    const encodedValue = abi.encodeConfigurable(name, value);
    bytecode.set(encodedValue, offset);
  };

  const writeIndirect = ({ concreteTypeId, offset }: Configurable, value: InputValue) => {
    const dynamicOffset = readIndirectOffset({ offset });

    // Read the original value
    const coder = abi.getCoder(concreteTypeId);
    const [, originalOffset] = coder.decode(bytecode, dynamicOffset);
    const originalLength = originalOffset - dynamicOffset;

    // Encode the new value
    const encodedValue = coder.encode(value);
    const newLength = encodedValue.length;

    // Update the bytecode
    bytecode = new Uint8Array([
      ...bytecode.slice(0, dynamicOffset),
      ...encodedValue,
      ...bytecode.slice(dynamicOffset + originalLength),
    ]);

    const additionalOffset = newLength - originalLength;

    // Update the other dynamic configurable offsets
    configurables
      .filter((configurable) => configurable.indirect && configurable.offset > offset)
      .forEach((configurable) => {
        const newDynamicOffset = readIndirectOffset({ offset: configurable.offset });
        const newOffset = newDynamicOffset + additionalOffset - dataOffset;

        const encodedOffset = dynamicOffsetCoder.encode(newOffset);
        bytecode.set(encodedOffset, configurable.offset);
      });
  };

  const write = (configurable: Configurable, value: InputValue) => {
    const writer = configurable.indirect ? writeIndirect : writeDirect;
    return writer(configurable, value);
  };

  return {
    /**
     * Reads the value of a configurable.
     *
     * @param name - The name of the configurable to read.
     * @returns The value of the configurable.
     */
    read: (name: string) => read(getConfigurable(name)),
    /**
     * Reads all the configurables.
     *
     * @returns An object of all configurables
     */
    all: (): Record<string, unknown> =>
      Object.fromEntries(configurables.map(read).map(({ name, value }) => [name, value])),
    /**
     * Updates the bytecode with the new configurable values.
     *
     * @param configurableValues - The new configurable values to set.
     * @returns The mutated bytecode.
     */
    set: (configurableValues: { [name: string]: unknown }) => {
      try {
        const configurableKeys = Object.keys(abi.configurables);
        const providedKeys = Object.keys(configurableValues);

        if (!configurableKeys.length) {
          throw new FuelError(
            FuelError.CODES.INVALID_CONFIGURABLE_CONSTANTS,
            `the program does not have configurable constants to be set.`
          );
        }

        const unknownKeys = providedKeys.filter((key) => !configurableKeys.includes(key));
        if (unknownKeys.length) {
          throw new FuelError(
            FuelError.CODES.INVALID_CONFIGURABLE_CONSTANTS,
            `unknown keys supplied:\n${unknownKeys.map((key) => `- '${key}'`).join('\n')}`
          );
        }

        configurables
          .sort((a, b) => b.offset - a.offset)
          .filter((configurable) => Object.hasOwn(configurableValues, configurable.name))
          .forEach((configurable) => {
            const value = configurableValues[configurable.name];
            write(configurable, value as InputValue);
          });
      } catch (err) {
        throw new FuelError(
          FuelError.CODES.INVALID_CONFIGURABLE_CONSTANTS,
          `Error setting configurable constants, ${(<Error>err).message}`
        );
      }

      return bytecode;
    },
  };
};
