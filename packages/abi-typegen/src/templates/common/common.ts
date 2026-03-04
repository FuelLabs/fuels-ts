import type { BinaryVersions } from '@fuel-ts/versions';

import { renderHbsTemplate } from '../renderHbsTemplate';

import commonTemplate from './common.hbs';

export function renderCommonTemplate(params: { versions: BinaryVersions }) {
  const { versions } = params;
  const text = renderHbsTemplate({ template: commonTemplate, versions });
  return text;
}
