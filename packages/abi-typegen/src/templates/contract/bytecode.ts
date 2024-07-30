import type { BytesLike } from '@fuel-ts/interfaces';
import type { BinaryVersions } from '@fuel-ts/versions';

import { renderHbsTemplate } from '../renderHbsTemplate';

import bytecodeTemplate from './bytecode.hbs';

export function renderBytecodeTemplate(params: {
  hexlifiedBytecode: BytesLike;
  versions: BinaryVersions;
}) {
  const { hexlifiedBytecode, versions } = params;

  const text = renderHbsTemplate({
    template: bytecodeTemplate,
    versions,
    data: {
      hexlifiedBytecode,
    },
  });

  return text;
}
