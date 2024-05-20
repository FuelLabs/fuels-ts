import type { IRawAbiConfigurable } from './IRawAbiConfigurable';
import type { IRawAbiFunction } from './IRawAbiFunction';
import type { IRawAbiLoggedTypes } from './IRawAbiLoggedTypes';
import type { IRawAbiTypeRoot, IRawAbiTypeRootNew } from './IRawAbiType';

export interface IRawAbi {
  types: IRawAbiTypeRoot[];
  functions: IRawAbiFunction[];
  loggedTypes: IRawAbiLoggedTypes[];
  configurables: IRawAbiConfigurable[];
}

export interface IRawAbiNew extends Omit<IRawAbi, 'types'> {
  types: Record<string, IRawAbiTypeRootNew>;
}
