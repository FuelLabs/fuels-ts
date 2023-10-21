import { AbiTypegenProjectsEnum } from '@fuel-ts/utils/test-utils';

import { getProjectResources } from '../../../test/fixtures/forc-projects';
import bytecodeTemplte from '../../../test/fixtures/templates/contract/bytecode.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';

import { renderBytecodeTemplate } from './bytecode';

describe('templates/contract/bytecode', () => {
  test('should render bytecode template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const project = getProjectResources(AbiTypegenProjectsEnum.MINIMAL);

    const rendered = renderBytecodeTemplate({
      hexlifiedBytecode: project.binHexlified,
    });

    // validating
    restore();

    expect(rendered).toEqual(bytecodeTemplte);
  });
});
