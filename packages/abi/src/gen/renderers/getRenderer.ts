import { assertUnreachable } from '@fuel-ts/utils';

import type { AbiGenInput } from '../abi-gen-types';

import { renderTs } from './ts/render-ts';
import type { Renderer } from './types';

export function getRenderer(mode: AbiGenInput['mode']): Renderer {
  switch (mode) {
    case 'ts':
    case undefined:
      return renderTs;
    default:
      return assertUnreachable(mode);
  }
}
