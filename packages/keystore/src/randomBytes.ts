import { crypto, strategy } from './universal-crypto';

export const randomBytes = (length: number) =>
  strategy === 'Node'
    ? crypto.randomBytes(length)
    : crypto.getRandomValues(new Uint8Array(length) as unknown as number);
