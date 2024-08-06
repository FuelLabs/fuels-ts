import { mockVersions } from '../../../test/utils/mockVersions';

import { renderIndexTemplate } from './index';

/**
 * @group node
 */
describe('templates/index', () => {
  test('should render index template for contracts', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const files = [{ path: './Contract.ts' }, { path: './ContractFactory.ts' }];

    const rendered = renderIndexTemplate({ files });

    // validating
    restore();

    expect(rendered).toContain(`export { Contract } from './Contract';`);
    expect(rendered).toContain(`export { ContractFactory } from './ContractFactory';`);
  });
});
