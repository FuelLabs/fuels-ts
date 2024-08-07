import { join } from 'path';

import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import expectedMainFullTemplate from '../../../test/fixtures/templates/contract/main.hbs';
import expectedMainMinimalConfigurableTemplate from '../../../test/fixtures/templates/contract-with-configurable/main.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { autoUpdateFixture } from '../../../test/utils/updateFixture';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { renderMainTemplate } from './main';

/**
 * @group node
 */
describe('templates/dts', () => {
  test('should render main template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.FULL);
    const { abiContents: rawContents } = project;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    let rendered = renderMainTemplate({ abi });

    rendered = autoUpdateFixture(
      join(__dirname, '../../../test/fixtures/templates/contract/main.hbs'),
      rendered
    );

    // validating
    restore();

    expect(rendered).toEqual(expectedMainFullTemplate);
  });

  test('should render main template with configurable', () => {
    const { restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.MINIMAL_WITH_CONFIGURABLE);

    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    let rendered = renderMainTemplate({ abi });

    rendered = autoUpdateFixture(
      join(__dirname, '../../../test/fixtures/templates/contract-with-configurable/main.hbs'),
      rendered
    );

    restore();

    expect(rendered).toEqual(expectedMainMinimalConfigurableTemplate);
  });

  test('should render main template w/ custom common types', () => {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.VECTOR_SIMPLE);
    const { abiContents: rawContents } = project;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderMainTemplate({ abi });

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

    const rendered = renderMainTemplate({ abi });

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

    const rendered = renderMainTemplate({ abi });

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

    const rendered = renderMainTemplate({ abi });

    expect(rendered).toMatch(
      /export enum MyEnumOutput { Checked = 'Checked', Pending = 'Pending' };$/m
    );
  });
});
