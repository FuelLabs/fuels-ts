import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects';
import bytecodeTemplate from '../../../test/fixtures/templates/contract/bytecode.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';

import { renderBytecodeTemplate } from './bytecode';

/**
 * We are removing the bytecode from the file contents
 * because the compressed bytecode is not deterministic.
 * It changes every time the file is compiled.
 * This is why we are removing this line from the file contents,
 * and asserting that the rest of the file contents are the same.
 */
const removeBytecodeFromFileContents = (fileContents: string) => {
  const bytecodeRegex = /const compresssedBytecode = '(.*)';/gm;
  const match = bytecodeRegex.exec(fileContents);
  if (!match) {
    throw new Error('Could not find bytecode in file contents.');
  }
  return fileContents.replace(bytecodeRegex, '');
};

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

    expect(removeBytecodeFromFileContents(rendered.trim())).toEqual(
      removeBytecodeFromFileContents(bytecodeTemplate.trim())
    );
  });
});
