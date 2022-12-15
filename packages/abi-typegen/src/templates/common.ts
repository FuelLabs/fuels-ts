import commonTemplate from './hbs/transpiled/common.hbs';
import { renderHbsTemplate } from './utils/renderHbsTemplate';

export function renderCommonTemplate() {
  const text = renderHbsTemplate({ template: commonTemplate });
  return text;
}
