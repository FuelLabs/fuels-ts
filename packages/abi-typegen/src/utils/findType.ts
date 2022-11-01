import type { IType } from '../abi/interfaces/IType';

export function findType(params: { types: IType[]; typeId: number }) {
  const { types, typeId } = params;

  const foundType = types.find(({ rawAbiType: { typeId: tid } }) => tid === typeId);

  if (!foundType) {
    throw new Error(`Type ID not found: ${typeId}.`);
  }

  return foundType;
}
