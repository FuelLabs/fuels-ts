import type { ResolvableType } from '../abi/ResolvableType';
import type { ResolvedType } from '../abi/ResolvedType';

import { makeType } from './makeType';
import type { SupportedTypeClass } from './supportedTypes';

function getComponentLabels(
  supportedTypes: SupportedTypeClass[],
  component: { name: string; type: ResolvedType | ResolvableType },
  includeName: boolean
): { input: string; output: string } {
  const {
    attributes: { inputLabel, outputLabel },
    typeDeclarations: { inputDecl, outputDecl },
  } = makeType(supportedTypes, component.type);

  const name = includeName ? `${component.name}: ` : '';

  return {
    input: `${name}${inputLabel}${inputDecl}`,
    output: `${name}${outputLabel}${outputDecl}`,
  };
}

export function getStructContents(
  supportedTypes: SupportedTypeClass[],
  type: ResolvedType | ResolvableType,
  includeComponentNames: boolean
) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const components = type.components!;
  return components
    .map((c) => getComponentLabels(supportedTypes, c, includeComponentNames))
    .reduce(
      (obj, val) => ({
        input: !obj.input ? val.input : `${obj.input}, ${val.input}`,
        output: !obj.output ? val.output : `${obj.output}, ${val.output}`,
      }),
      {} as { input: string; output: string }
    );
}
