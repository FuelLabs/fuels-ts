import { Logger } from '@ethersproject/logger';

const version = 'abi/5.6.4';
export const abiLogger = new Logger(version);

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
