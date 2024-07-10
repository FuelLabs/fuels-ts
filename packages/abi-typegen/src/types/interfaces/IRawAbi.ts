import type { JsonAbiConfigurable } from './IRawAbiConfigurable';
import type { JsonAbiFunction } from './IRawAbiFunction';
import type { JsonAbiLoggedType } from './IRawAbiLoggedTypes';
import type { JsonAbiMessagesType } from './IRawAbiMessagesType';
import type { JsonAbiType } from './IRawAbiType';

export interface JsonAbi {
  types: JsonAbiType[];
  functions: JsonAbiFunction[];
  loggedTypes: JsonAbiLoggedType[];
  configurables: JsonAbiConfigurable[];
  messagesTypes: JsonAbiMessagesType[];
}
