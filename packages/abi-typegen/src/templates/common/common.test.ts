import { mockVersions } from '../../../test/utils/mockVersions';

import { renderCommonTemplate } from './common';

/**
 * @group node
 */
describe('templates/common', () => {
  test('should render common template', () => {
    // mocking
    const { versions, restore } = mockVersions();

    // executing
    const rendered = renderCommonTemplate({ versions });

    // validating
    restore();

    const { FORC, FUELS, FUEL_CORE } = versions;

    const expectedFuelsVersion = new RegExp(`Fuels version: ${FUELS}`);
    const expectedForcVersion = new RegExp(`Forc version: ${FORC}`);
    const expectedFuelCoreVersion = new RegExp(`Fuel-Core version: ${FUEL_CORE}`);

    expect(rendered).toMatch(expectedFuelsVersion);
    expect(rendered).toMatch(expectedForcVersion);
    expect(rendered).toMatch(expectedFuelCoreVersion);
  });
});
