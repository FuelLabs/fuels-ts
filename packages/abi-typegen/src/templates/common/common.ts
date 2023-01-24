import { renderHbsTemplate } from '../renderHbsTemplate';

import commonTemplate from './common.hbs';

export function renderCommonTemplate() {
  const text = renderHbsTemplate({ template: commonTemplate });
  return text;
}
