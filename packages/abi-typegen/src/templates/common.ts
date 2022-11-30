import commonTemplate from './hbs/common.hbs';
import { renderHbsTemplate } from './utils/renderHbsTemplate';

export function renderCommonTemplate() {
  const text = renderHbsTemplate({ template: commonTemplate });
  return text;
}
