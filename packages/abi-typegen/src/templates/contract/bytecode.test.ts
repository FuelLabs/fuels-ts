import { ForcProjectsEnum, getProjectResources } from '../../../test/fixtures/forc-projects';
import bytecodeTemplate from '../../../test/fixtures/templates/contract/bytecode.hbs';
import { updateVersions } from '../../../test/utils/updateVersions';

import { renderBytecodeTemplate } from './bytecode';

/**
 * @group node
 */
describe('templates/contract/bytecode', () => {
  test('should render bytecode template', () => {
    const project = getProjectResources(ForcProjectsEnum.MINIMAL);

    const rendered = renderBytecodeTemplate({
      hexlifiedBytecode: project.binHexlified,
    });

    expect(rendered).toEqual(updateVersions(bytecodeTemplate));
  });
});
