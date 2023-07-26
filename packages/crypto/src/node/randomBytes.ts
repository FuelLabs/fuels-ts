import crypto from 'crypto';

export const randomBytes = (length: number) => {
  const randomValues = crypto.randomBytes(length);
  return randomValues;
};
