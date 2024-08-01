import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import expectedDtsFullTemplate from '../../../test/fixtures/templates/contract/dts.hbs';
import expectedDtsMinimalConfigurableTemplate from '../../../test/fixtures/templates/contract-with-configurable/dts.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { renderDtsTemplate } from './dts';

/**
 * @group node
 */
describe('templates/dts', () => {
  test.each(['debug', 'release'])('should render dts template [%s]', (build) => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const project = getTypegenForcProject(
      AbiTypegenProjectsEnum.FULL,
      build as 'release' | 'debug'
    );
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

  test('should render dts template with configurable', () => {
    const { restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.MINIMAL_WITH_CONFIGURABLE);

    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi });

    restore();

    expect(rendered).toEqual(expectedDtsMinimalConfigurableTemplate);
  });

  test('should render dts template w/ custom common types', () => {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.VECTOR_SIMPLE);
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
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.STRUCT_SIMPLE);
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
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.ENUM_SIMPLE);
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

  test('should not render same value for native identical enums', () => {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.ENUM_SIMPLE_NATIVE);
    const { abiContents: rawContents } = project;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi });
    expect(rendered).toMatch(
      /export enum MyEnumOutput { Checked = 'Checked', Pending = 'Pending' };$/m
    );
  });
});
