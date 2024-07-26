import { bufferFromString } from '@fuel-ts/crypto';
import { sha256 } from '@fuel-ts/hasher';
import { bn } from '@fuel-ts/math';

import type { ResolvedType } from '../ResolvedType';
import type { AbiFunction } from '../types/JsonAbi';

import { structRegEx, arrayRegEx, enumRegEx, stringRegEx, isVector } from './constants';

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

function getArgSignatureContent(resolved: ResolvedType): string {
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
    return `[${getSignature(resolved.components[0].type)};${arrayMatch.length}]`;
  }

  const typeArgumentsSignature =
    resolved.typeParamsArgsMap && Object.values(resolved.typeParamsArgsMap).length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
        `<${Object.values(resolved.typeParamsArgsMap).map(([, mt]) => getSignature(mt))}>`
      : '';

  const componentsSignature = isVector(resolved.type)
    ? `(s${typeArgumentsSignature}(rawptr,u64),u64)`
    : // eslint-disable-next-line @typescript-eslint/no-use-before-define
      `(${resolved.components.map((c) => getSignature(c.type)).join(',')})`;
  return `${typeArgumentsSignature}${componentsSignature}`;
}

function getSignature(type: ResolvedType) {
  const prefix = getArgSignaturePrefix(type);
  const content = getArgSignatureContent(type);

  return `${prefix}${content}`;
}

export function getFunctionSignature(fn: AbiFunction, resolvedTypes: ResolvedType[]): string {
  const inputsSignatures = fn.inputs.map((input) =>
    getSignature(resolvedTypes.find((rt) => rt.typeId === input.concreteTypeId) as ResolvedType)
  );

  return `${fn.name}(${inputsSignatures.join(',')})`;
}

export function getFunctionSelector(functionSignature: string) {
  const hashedFunctionSignature = sha256(bufferFromString(functionSignature, 'utf-8'));
  // get first 4 bytes of signature + 0x prefix. then left-pad it to 8 bytes using toHex(8)
  return bn(hashedFunctionSignature.slice(0, 10)).toHex(8);
}
