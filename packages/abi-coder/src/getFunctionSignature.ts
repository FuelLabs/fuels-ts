import type { ResolvableType } from './ResolvableType';
import type { ResolvedType } from './ResolvedType';
import { makeResolvedType } from './makeResolvedType';
import type { JsonAbi, AbiFunction } from './types/JsonAbi';
import { structRegEx, arrayRegEx, enumRegEx, stringRegEx, isVector } from './utils/constants';

function getArgSignaturePrefix({ type }: ResolvedType): string {
  const structMatch = structRegEx.test(type);
  if (structMatch) {
    return 's';
  }

  const arrayMatch = arrayRegEx.test(type);
  if (arrayMatch) {
    return 'a';
  }

  const enumMatch = enumRegEx.test(type);
  if (enumMatch) {
    return 'e';
  }

  return '';
}

function getArgSignatureContent(abi: JsonAbi, resolved: ResolvedType): string {
  if (resolved.type === 'raw untyped ptr') {
    return 'rawptr';
  }

  if (resolved.type === 'raw untyped slice') {
    return 'rawslice';
  }

  const strMatch = stringRegEx.exec(resolved.type)?.groups;
  if (strMatch) {
    return `str[${strMatch.length}]`;
  }

  if (resolved.components === undefined) {
    return resolved.type;
  }

  const arrayMatch = arrayRegEx.exec(resolved.type)?.groups;

  if (arrayMatch) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return `[${getSignature(abi, resolved.components[0].type)};${arrayMatch.length}]`;
  }

  const typeArgumentsSignature =
    resolved.typeParamsArgsMap && Object.values(resolved.typeParamsArgsMap).length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
        `<${Object.values(resolved.typeParamsArgsMap).map(([, rmt]) => getSignature(abi, rmt))}>`
      : '';

  const componentsSignature = isVector(resolved.type)
    ? `(s${typeArgumentsSignature}(rawptr,u64),u64)`
    : // eslint-disable-next-line @typescript-eslint/no-use-before-define
      `(${resolved.components.map((c) => getSignature(abi, c.type)).join(',')})`;
  return `${typeArgumentsSignature}${componentsSignature}`;
}

function getSignature(abi: JsonAbi, type: ResolvedType) {
  const prefix = getArgSignaturePrefix(type);
  const content = getArgSignatureContent(abi, type);

  return `${prefix}${content}`;
}

export function getFunctionSignature(
  abi: JsonAbi,
  resolvableTypes: ResolvableType[],
  fn: AbiFunction
): string {
  const inputsSignatures = fn.inputs.map((input) =>
    getSignature(abi, makeResolvedType(abi, resolvableTypes, input.concreteTypeId))
  );

  return `${fn.name}(${inputsSignatures.join(',')})`;
}
