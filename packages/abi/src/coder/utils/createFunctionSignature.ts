/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  ARRAY_REGEX,
  ENUM_REGEX,
  STRING_REGEX,
  STRUCT_REGEX,
  swayTypeMatchers,
} from '../../matchers/sway-type-matchers';
import type { AbiFunction, AbiConcreteType, AbiTypeComponent } from '../../parser';

const HEAP_TYPE_SIGNATURE = '(rawptr,u64),u64';

const createSignaturePrefix = ({
  type,
}: {
  type: AbiConcreteType | AbiTypeComponent['type'];
}): string => {
  switch (true) {
    case STRUCT_REGEX.test(type.swayType):
      return 's';

    case ARRAY_REGEX.test(type.swayType):
      return 'a';

    case ENUM_REGEX.test(type.swayType):
      return 'e';

    default:
      return '';
  }
};

const createSignatureContents = ({
  type,
}: {
  type: AbiConcreteType | AbiTypeComponent['type'];
}): string => {
  const { swayType, components, metadata } = type;

  if (swayTypeMatchers.rawUntypedSlice(type)) {
    return 'rawslice';
  }

  const strMatch = STRING_REGEX.exec(swayType)?.groups;
  if (strMatch) {
    return `str[${strMatch.length}]`;
  }

  if (swayTypeMatchers.bytes(type)) {
    return `(s${HEAP_TYPE_SIGNATURE})`;
  }

  if (components === undefined) {
    return swayType;
  }

  const arrayMatch = ARRAY_REGEX.exec(swayType)?.groups;
  if (arrayMatch) {
    const arrayElementSignature = createSignatureForType(components[0]);
    return `[${arrayElementSignature};${arrayMatch.length}]`;
  }

  const typeArgumentsSignature = metadata?.typeArguments
    ? `<${metadata.typeArguments
        ?.map((typeArgument) => createSignatureForType({ type: typeArgument }))
        .join(',')}>`
    : '';

  const componentsSignature = swayTypeMatchers.vector(type)
    ? `s${typeArgumentsSignature}${HEAP_TYPE_SIGNATURE}`
    : components.map(createSignatureForType).join(',');

  return `${typeArgumentsSignature}(${componentsSignature})`;
};

const createSignatureForType = (input: {
  type: AbiConcreteType | AbiTypeComponent['type'];
}): string => {
  const prefix = createSignaturePrefix(input);
  const contents = createSignatureContents(input);

  return `${prefix}${contents}`;
};

export const createFunctionSignature = (fn: AbiFunction): string => {
  const functionInputsSignature = fn.inputs.map(createSignatureForType).join(',');
  return `${fn.name}(${functionInputsSignature})`;
};
