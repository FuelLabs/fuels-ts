import { contractPaths } from '../../../test/fixtures';
import expectedDtsFullTemplate from '../../../test/fixtures/templates/contract/dts.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { buildSway } from '../../../test/utils/sway/buildSway';
import { Abi } from '../../abi/Abi';
import { CategoryEnum } from '../../types/enums/CategoryEnum';

import { renderDtsTemplate } from './dts';

describe('templates/dts', () => {
  test('should render dts template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const contractPath = contractPaths.full;
    const { rawContents } = buildSway({ contractPath });

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      category: CategoryEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi });

    // validating
    restore();

    expect(rendered).toEqual(expectedDtsFullTemplate);
  });

  test('should render dts template w/ custom common types', () => {
    const contractPath = contractPaths.vectorSimple;
    const { rawContents } = buildSway({ contractPath });
    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      category: CategoryEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi });
    expect(rendered).toMatch(/^import type.+from ".\/common";$/m);
  });

  test('should render dts cross-referencing for identical structs', () => {
    const contractPath = contractPaths.structSimple;
    const { rawContents } = buildSway({ contractPath });
    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      category: CategoryEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi });
    expect(rendered).toMatch(/export type StructBOutput<T> = StructBInput<T>;$/m);
  });

  test('should render dts cross-referencing for identical enums', () => {
    const contractPath = contractPaths.enumSimple;
    const { rawContents } = buildSway({ contractPath });
    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      category: CategoryEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi });
    expect(rendered).toMatch(/export type MyEnumOutput = MyEnumInput;$/m);
  });
});
