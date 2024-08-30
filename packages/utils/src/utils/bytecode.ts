import type { BytesLike } from '@fuel-ts/interfaces';
import { gzipSync, gunzipSync } from 'fflate';

import { arrayify } from './arrayify';

export const compressBytecode = (bytecodeAsBinary?: BytesLike) => {
  if (!bytecodeAsBinary) {
    return '';
  }

  const bytecodeCompressBytes = arrayify(bytecodeAsBinary);
  const bytecodeCompressGzipped = gzipSync(bytecodeCompressBytes, { mtime: 0 });
  const bytecodeCompressBinary = String.fromCharCode.apply(
    null,
    new Uint8Array(bytecodeCompressGzipped) as unknown as number[]
  );
  const bytecodeCompressEncoded = btoa(bytecodeCompressBinary);

  return bytecodeCompressEncoded;
};

export const decompressBytecode = (bytecodeAsBase64: string) => {
  const bytecodeDecompressBinary = atob(bytecodeAsBase64);
  const bytecodeDecompressDecoded = new Uint8Array(bytecodeDecompressBinary.length).map((_, i) =>
    bytecodeDecompressBinary.charCodeAt(i)
  );
  const bytecodeDecompressBytes = gunzipSync(bytecodeDecompressDecoded);

  return bytecodeDecompressBytes;
};
