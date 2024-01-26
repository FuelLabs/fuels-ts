import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects';
import bytecodeTemplate from '../../../test/fixtures/templates/contract/bytecode.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';

import { renderBytecodeTemplate } from './bytecode';

/**
 * @group node
 */
describe('templates/contract/bytecode', () => {
  test('should render bytecode template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.MINIMAL);

    const rendered = renderBytecodeTemplate({
      hexlifiedBytecode: project.binHexlified,
    });

    // validating
    restore();

    expect(rendered.trim()).toEqual(bytecodeTemplate);
  });
});
