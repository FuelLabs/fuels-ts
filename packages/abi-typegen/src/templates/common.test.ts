import { renderCommonTemplate } from './common';

describe('templates/common', () => {
  test('should render common template', () => {
    expect(renderCommonTemplate()).toBeTruthy;
  });
});
