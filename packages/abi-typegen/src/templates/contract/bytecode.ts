import type { BytesLike } from '@fuel-ts/interfaces';
import { compressBytecode } from '@fuel-ts/utils';

import { renderHbsTemplate } from '../renderHbsTemplate';

import bytecodeTemplate from './bytecode.hbs';

export function renderBytecodeTemplate(params: { hexlifiedBytecode: BytesLike }) {
  const text = renderHbsTemplate({
    template: bytecodeTemplate,
    data: {
      compressedBytecode: compressBytecode(params.hexlifiedBytecode),
    },
  });

  return text;
}
