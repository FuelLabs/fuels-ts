import { Logger } from '@ethersproject/logger';

const version = 'abi/5.6.4';
export const abiLogger = new Logger(version);

const ModifiersBytes: { [name: string]: boolean } = { calldata: true, memory: true, storage: true };
const ModifiersNest: { [name: string]: boolean } = { calldata: true, memory: true };
export function checkModifier(type: string, name: string): boolean {
  if (type === 'bytes' || type === 'string') {
    if (ModifiersBytes[name]) {
      return true;
    }
  } else if (type === 'address') {
    if (name === 'payable') {
      return true;
    }
  } else if (type.indexOf('[') >= 0 || type === 'tuple') {
    if (ModifiersNest[name]) {
      return true;
    }
  }
  if (ModifiersBytes[name] || name === 'payable') {
    abiLogger.throwArgumentError('invalid modifier', 'name', name);
  }
  return false;
}

export function verifyType(type: string): string {
  // These need to be transformed to their full description
  if (type.match(/^uint($|[^1-9])/)) {
    return `uint256${type.substring(4)}`;
  }

  if (type.match(/^int($|[^1-9])/)) {
    return `int256${type.substring(3)}`;
  }

  return type;
}
