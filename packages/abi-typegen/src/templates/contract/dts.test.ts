import { getProjectResources, ForcProjectsEnum } from '../../../test/fixtures/forc-projects/index';
import expectedDtsFullTemplate from '../../../test/fixtures/templates/contract/dts.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { renderDtsTemplate } from './dts';

describe('templates/dts', () => {
  test('should render dts template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const project = getProjectResources(ForcProjectsEnum.FULL);
    const { abiContents: rawContents } = project;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi });

    // validating
    restore();

    expect(rendered).toEqual(expectedDtsFullTemplate);
  });

  test('should render dts template w/ custom common types', () => {
    const project = getProjectResources(ForcProjectsEnum.VECTOR_SIMPLE);
    const { abiContents: rawContents } = project;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi });
    expect(rendered).toMatch(/^import type.+from ".\/common";$/m);
  });

  test('should render dts cross-referencing for identical structs', () => {
    const project = getProjectResources(ForcProjectsEnum.STRUCT_SIMPLE);
    const { abiContents: rawContents } = project;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi });
    expect(rendered).toMatch(/export type StructBOutput<T> = StructBInput<T>;$/m);
  });

  test('should render dts cross-referencing for identical enums', () => {
    const project = getProjectResources(ForcProjectsEnum.ENUM_SIMPLE);
    const { abiContents: rawContents } = project;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi });
    expect(rendered).toMatch(/export type MyEnumOutput = MyEnumInput;$/m);
  });
});
