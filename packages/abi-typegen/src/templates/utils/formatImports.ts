import uniq from 'lodash.uniq';

import type { IType } from '../../types/interfaces/IType';

const caseInsensitiveSort = (a: string, b: string) =>
  a.toLowerCase().localeCompare(b.toLowerCase());

export function formatImports(params: { types: IType[]; baseMembers?: string[] }) {
  const { types, baseMembers = [] } = params;

  const fuelTypes = types.filter((t) => t.requireImportFromFuels);
  const members = fuelTypes.map((t) => t.attributes.inputLabel);
  const imports = uniq(baseMembers.concat(members).sort(caseInsensitiveSort));

  return {
    imports: imports.length ? imports : undefined,
  };
}
