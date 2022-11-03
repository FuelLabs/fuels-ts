import { COMMON_TEMPLATE, renderCommonTemplate } from './common';

describe('templates/common', () => {
  test('should render common template', () => {
    expect(renderCommonTemplate()).toEqual(COMMON_TEMPLATE);
  });
});
