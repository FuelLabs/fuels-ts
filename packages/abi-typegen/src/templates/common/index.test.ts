import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import contractIndexTemplate from '../../../test/fixtures/templates/contract/index.hbs';
import predicateIndexTemplate from '../../../test/fixtures/templates/predicate/index.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { renderIndexTemplate } from './index';

/**
 * @group node
 */
describe('templates/index', () => {
  test('should render index template for contracts', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.MINIMAL);
    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderIndexTemplate({ abis: [abi] });

    // validating
    restore();

    expect(rendered).toEqual(contractIndexTemplate);
  });

  test('should render index template for predicates', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.PREDICATE);
    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-predicate-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.PREDICATE,
    });

    const rendered = renderIndexTemplate({ abis: [abi] });

    // validating
    restore();

    expect(rendered).toEqual(predicateIndexTemplate);
  });
});
