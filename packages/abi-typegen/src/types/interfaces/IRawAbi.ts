import type { IRawAbiConfigurable } from './IRawAbiConfigurable';
import type { IRawAbiFunction } from './IRawAbiFunction';
import type { IRawAbiLoggedTypes } from './IRawAbiLoggedTypes';
import type { IRawAbiTypeRoot } from './IRawAbiType';

export interface IRawAbi {
  types: IRawAbiTypeRoot[];
  functions: IRawAbiFunction[];
  loggedTypes: IRawAbiLoggedTypes[];
  configurables: IRawAbiConfigurable[];
}
