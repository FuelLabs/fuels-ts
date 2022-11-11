import { getPackageVersion } from '../utils/getPackageVersion';

import { renderCommonTemplate } from './common';

describe('templates/common', () => {
  test('should render common template', () => {
    const { version: fuelsVersion } = getPackageVersion();
    const expectedVersion = `Fuels version: ${fuelsVersion}`;
    expect(renderCommonTemplate({ fuelsVersion })).toMatch(expectedVersion);
  });
});
