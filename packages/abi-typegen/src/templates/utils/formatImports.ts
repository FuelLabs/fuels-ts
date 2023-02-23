import uniq from 'lodash.uniq';

import type { IType } from '../../types/interfaces/IType';

export function formatImports(params: { types: IType[]; baseMembers?: string[] }) {
  const { types, baseMembers = [] } = params;

  const fuelTypes = types.filter((t) => t.requireImportFromFuels);
  const members = fuelTypes.map((t) => t.attributes.inputLabel);
  const imports = uniq(baseMembers.concat(members).sort());

  return {
    imports: imports.length ? imports : undefined,
  };
}
