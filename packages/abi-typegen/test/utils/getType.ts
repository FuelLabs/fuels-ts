import { ResolvableType } from '../../src/abi/ResolvableType';
import type { IType } from '../../src/types/interfaces/IType';
import { makeType } from '../../src/utils/makeType';
import { supportedTypes } from '../../src/utils/supportedTypes';
import type { AbiTypegenProjectsEnum } from '../fixtures/forc-projects';
import { getTypegenForcProject } from '../fixtures/forc-projects';

export function getType(project: AbiTypegenProjectsEnum, inputLabel: string) {
  const { abiContents } = getTypegenForcProject(project);

  const resolvableTypes = abiContents.metadataTypes.map(
    (tm) => new ResolvableType(abiContents, tm.metadataTypeId, undefined)
  );

  const types = resolvableTypes.map((t) => makeType(supportedTypes, t));

  return types.find((t) => t.attributes.inputLabel === inputLabel) as IType;
}
