import { mockVersions } from '../../../test/utils/mockVersions';

import { renderCommonTemplate } from './common';

describe('templates/common', () => {
  test('should render common template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const expectedVersion = /(Fuels|Forc|Fuel-Core) version: 0.0.0/;

    // validating
    restore();

    expect(renderCommonTemplate()).toMatch(expectedVersion);
  });
});
