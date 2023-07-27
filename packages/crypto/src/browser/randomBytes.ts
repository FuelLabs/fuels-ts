import { crypto } from './crypto';

export const randomBytes = (length: number) => {
  const randomValues = crypto.getRandomValues(new Uint8Array(length));
  return randomValues;
};
