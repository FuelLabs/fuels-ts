import { contractPaths } from '../../../test/fixtures';
import expectedDtsFullTemplate from '../../../test/fixtures/templates/contract/dts.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { compileSwayToJson } from '../../../test/utils/sway/compileSwayToJson';
import { Abi } from '../../abi/Abi';

import { renderDtsTemplate } from './dts';

describe('templates/dts', () => {
  test('should render dts template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const contractPath = contractPaths.full;
    const { rawContents } = compileSwayToJson({ contractPath });

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
    });

    const rendered = renderDtsTemplate({ abi });

    // validating
    restore();

    expect(rendered).toEqual(expectedDtsFullTemplate);
  });

  test('should render dts template w/ custom common types', () => {
    const contractPath = contractPaths.vectorSimple;
    const { rawContents } = compileSwayToJson({ contractPath });
    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
    });

    const rendered = renderDtsTemplate({ abi });
    expect(rendered).toMatch(/^import type.+from ".\/common";$/m);
  });

  test('should render dts cross-referencing for identical structs', () => {
    const contractPath = contractPaths.structSimple;
    const { rawContents } = compileSwayToJson({ contractPath });
    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
    });

    const rendered = renderDtsTemplate({ abi });
    expect(rendered).toMatch(/export type StructBOutput<T> = StructBInput<T>;$/m);
  });

  test('should render dts cross-referencing for identical enums', () => {
    const contractPath = contractPaths.enumSimple;
    const { rawContents } = compileSwayToJson({ contractPath });
    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
    });

    const rendered = renderDtsTemplate({ abi });
    expect(rendered).toMatch(/export type MyEnumOutput = MyEnumInput;$/m);
  });
});
