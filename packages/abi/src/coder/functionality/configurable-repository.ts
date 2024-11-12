import { FuelError } from '@fuel-ts/errors';

import type { AbiConfigurable } from '../../parser';
import type { AbiCoderConfigurable } from '../abi-coder-types';
import type { AbiEncoding } from '../encoding/encoding';

export class ConfigurableRepository {
  /**
   * Configurable factory
   *
   * @param configurable - The JSON ABI configurable
   * @param encoding - The encoding schema
   * @returns The configurable for coding related operations
   */
  private static make = (
    configurable: AbiConfigurable,
    encoding: AbiEncoding
  ): AbiCoderConfigurable => ({
    name: configurable.name,
    offset: configurable.offset,
    value: encoding.getCoder(configurable),
  });

  /**
   * Internal member fields
   */
  private _configurables: Record<string, AbiCoderConfigurable> = {};

  /**
   * @param functions - The JSON ABI functions
   * @param encoding - The encoding schema
   */
  public constructor(configurables: AbiConfigurable[], encoding: AbiEncoding) {
    this._configurables = Object.fromEntries(
      configurables.map((conf) => [conf.name, ConfigurableRepository.make(conf, encoding)])
    );
  }

  /**
   * Get all the functions
   */
  public get configurables(): Record<string, AbiCoderConfigurable> {
    return this._configurables;
  }

  /**
   * Find configurable by name
   *
   * @param name - The configurable name
   * @returns The configurable
   *
   * @throws If the configurable is not found
   */
  public findByName(name: string): AbiCoderConfigurable {
    const configurable = this._configurables[name];

    if (configurable === undefined) {
      throw new FuelError(
        FuelError.CODES.CONFIGURABLE_NOT_FOUND,
        `The configurable with the name "${name}" could not be found.`
      );
    }
    return configurable;
  }
}
