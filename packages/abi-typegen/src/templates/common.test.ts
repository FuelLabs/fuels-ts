import { renderCommonTemplate } from './common';

describe('templates/common', () => {
  test('should render common template', () => {
    const expectedVersion = /(Fuels|Forc|Fuel-Core) version: 0.0.0/;
    expect(renderCommonTemplate()).toMatch(expectedVersion);
  });
});
