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
  test.each(['debug', 'release'])('should render dts template', (build) => {
    // mocking
    const { versions, restore } = mockVersions();

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

    const rendered = renderDtsTemplate({ abi, versions });

    // validating
    restore();

    expect(rendered).toEqual(expectedDtsFullTemplate);
  });

  test('should render dts template with configurable', () => {
    const { versions, restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.MINIMAL_WITH_CONFIGURABLE);

    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi, versions });

    restore();

    expect(rendered).toEqual(expectedDtsMinimalConfigurableTemplate);
  });

  test('should render dts template w/ custom common types', () => {
    const { versions, restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.VECTOR_SIMPLE);
    const { abiContents: rawContents } = project;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi, versions });
    restore();
    expect(rendered).toMatch(/^import type.+from ".\/common";$/m);
  });

  test('should render dts cross-referencing for identical structs', () => {
    const { versions, restore } = mockVersions();
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.STRUCT_SIMPLE);
    const { abiContents: rawContents } = project;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi, versions });
    restore();
    expect(rendered).toMatch(/export type StructBOutput<T> = StructBInput<T>;$/m);
  });

  test('should render dts cross-referencing for identical enums', () => {
    const { versions, restore } = mockVersions();
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.ENUM_SIMPLE);
    const { abiContents: rawContents } = project;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi, versions });
    restore();
    expect(rendered).toMatch(/export type MyEnumOutput = MyEnumInput;$/m);
  });

  test('should not render same value for native identical enums', () => {
    const { versions, restore } = mockVersions();
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.ENUM_SIMPLE_NATIVE);
    const { abiContents: rawContents } = project;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi, versions });
    restore();
    expect(rendered).toMatch(
      /export enum MyEnumOutput { Checked = 'Checked', Pending = 'Pending' };$/m
    );
  });
});
