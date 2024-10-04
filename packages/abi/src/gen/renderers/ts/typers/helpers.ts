import type { TyperReturn } from './types';

export function flattenImports(mapped: TyperReturn[]) {
  const fuelsTypeImports = mapped.flatMap((m) => m.fuelsTypeImports).filter((x) => x !== undefined);
  const commonTypeImports = mapped
    .flatMap((m) => m.commonTypeImports)
    .filter((x) => x !== undefined);

  return { fuelsTypeImports, commonTypeImports };
}
