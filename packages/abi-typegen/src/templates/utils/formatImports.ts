import { uniq } from 'ramda';

import type { IType } from '../../types/interfaces/IType';

const caseInsensitiveSort = (a: string, b: string) =>
  a.toLowerCase().localeCompare(b.toLowerCase());

export function formatImports(params: { types: IType[]; baseMembers?: string[] }) {
  const { types, baseMembers = [] } = params;

  const members = types.flatMap((t) => t.requiredFuelsMembersImports);
  const imports = uniq(baseMembers.concat(members).sort(caseInsensitiveSort));

  return {
    imports: imports.length ? imports : undefined,
  };
}
