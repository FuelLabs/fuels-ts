/**
 * Types for Fuel JSON ABI Format as defined on:
 * https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#json-abi-format
 */

export interface JsonAbiFragmentType {
  readonly type: string;
  readonly name?: string;
  // TODO: Remove `null` when forc doesn't output nulls (https://github.com/FuelLabs/sway/issues/926)
  readonly components?: ReadonlyArray<JsonAbiFragmentType> | null;
}

export interface JsonAbiFragment {
  readonly type:
    | 'function'
    // We actually shouldn't accept string here, but when importing a JSON file
    // TS types string literals as strings so we have to.
    // TODO: Remove when TS issue is resolved: https://github.com/microsoft/TypeScript/issues/32063
    | string;
  readonly name: string;
  readonly inputs?: ReadonlyArray<JsonAbiFragmentType>;
  readonly outputs?: ReadonlyArray<JsonAbiFragmentType>;
}

/**
 * A JSON ABI object
 */
export type JsonAbi = ReadonlyArray<JsonAbiFragment>;

/**
 * Checks if a given type is a reference type
 * See: https://github.com/FuelLabs/sway/issues/1368
 */
export const isReferenceType = (type: string) => {
  switch (type) {
    case 'u8':
    case 'u16':
    case 'u32':
    case 'u64':
    case 'bool': {
      return false;
    }
    default: {
      return true;
    }
  }
};
