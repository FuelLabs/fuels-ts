import type { BytesLike } from '@fuel-ts/interfaces';

import type { AbiConfigurable, AbiFunction, AbiLoggedType } from '../parser';

import type { DecodedValue, InputValue } from './encoding/encoding-types';

export interface AbiCoderFunction {
  name: AbiFunction['name'];
  inputs: AbiFunction['inputs'];
  signature: string;
  selector: string;
  selectorBytes: Uint8Array;
  attributes: AbiFunction['attributes'];

  // Methods
  isReadOnly: () => boolean;
  encodeArguments: (values: InputValue[]) => Uint8Array;
  decodeArguments: (data: BytesLike) => DecodedValue[];
  encodeOutput: (value: InputValue) => Uint8Array;
  decodeOutput: (data: BytesLike) => DecodedValue;
}

export interface AbiCoderConfigurable {
  name: AbiConfigurable['name'];
  offset: AbiConfigurable['offset'];
  encode: (values: InputValue) => Uint8Array;
  decode: (data: BytesLike) => DecodedValue;
}

export interface AbiCoderLog {
  logId: AbiLoggedType['logId'];
  encode: (values: InputValue) => Uint8Array;
  decode: (data: BytesLike) => DecodedValue;
}

export interface AbiCoderType {
  encode: (value: InputValue) => Uint8Array;
  decode: (data: BytesLike) => DecodedValue;
}
