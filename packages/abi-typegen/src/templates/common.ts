import { renderHbsTemplate } from './utils/renderHbsTemplate';
import { templatePaths } from './utils/templatePaths';

export function renderCommonTemplate() {
  const text = renderHbsTemplate({ filepath: templatePaths.common });
  return text;
}
