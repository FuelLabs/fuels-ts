import type { BytesLike } from '@ethersproject/bytes';

import { renderHbsTemplate } from '../renderHbsTemplate';

import bytecodeTemplate from './bytecode.hbs';

export function renderBytecodeTemplate(params: { hexlifiedBytecode: BytesLike }) {
  const text = renderHbsTemplate({
    template: bytecodeTemplate,
    data: {
      hexlifiedBytecode: params.hexlifiedBytecode,
    },
  });

  return text;
}
