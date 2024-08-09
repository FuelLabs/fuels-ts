import type { BytesLike } from '@fuel-ts/interfaces';
import { gzipSync, gunzipSync } from 'fflate';

import { arrayify } from './arrayify';

export const compressBytecode = (bytecode?: BytesLike) => {
  if (!bytecode) {
    return '';
  }

  const bytecodeBytes = arrayify(bytecode);
  const bytecodeGzipped = gzipSync(bytecodeBytes);
  const bytecodeEncoded = Buffer.from(bytecodeGzipped).toString('base64');

  return bytecodeEncoded;
};

export const decompressBytecode = (bytecode: string) => {
  const bytecodeDecoded = Buffer.from(bytecode, 'base64').toString('binary');
  const bytecodeGzipped = Buffer.from(bytecodeDecoded, 'binary');
  const bytecodeBytes = gunzipSync(bytecodeGzipped);

  return bytecodeBytes;
};
