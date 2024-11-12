import { ARRAY_REGEX, STRING_REGEX, swayTypeMatchers } from '../../matchers/sway-type-matchers';
import type { AbiFunction, AbiType } from '../../parser';

const createSignaturePrefix = ({ type }: { type: AbiType }): string => {
  switch (true) {
    case swayTypeMatchers.struct(type):
      return 's';

    case swayTypeMatchers.array(type):
      return 'a';

    case swayTypeMatchers.enum(type):
      return 'e';

    default:
      return '';
  }
};

const createSignatureContents = ({ type }: { type: AbiType }): string => {
  const { swayType, components } = type;

  if (swayTypeMatchers.rawUntypedPtr(type)) {
    return 'rawptr';
  }

  if (swayTypeMatchers.rawUntypedSlice(type)) {
    return 'rawslice';
  }

  const strMatch = STRING_REGEX.exec(swayType)?.groups;
  if (strMatch) {
    return `str[${strMatch.length}]`;
  }

  if (components === undefined) {
    return swayType;
  }

  const arrayMatch = ARRAY_REGEX.exec(swayType)?.groups;
  if (arrayMatch) {
    // TODO: sort out lint error
    const arrayElementSignature = createSignatureForType(components[0]);
    return `[${arrayElementSignature};${arrayMatch.length}]`;
  }

  // // TODO: implement the following, talk with @nedsalk
  // const typeArgumentsSignature =
  //   this.originalTypeArguments !== null
  //     ? `<${this.originalTypeArguments
  //         .map((a) => new ResolvedAbiType(this.abi, a).getSignature())
  //         .join(',')}>`
  //     : '';

  // const componentsSignature = `(${this.components.map((c) => c.getSignature()).join(',')})`;

  // return `${typeArgumentsSignature}${componentsSignature}`;

  // TODO: this is incorrect and should be the same implementation as above.
  return '';
};

const createSignatureForType = (input: { type: AbiType }): string => {
  const prefix = createSignaturePrefix(input);
  const contents = createSignatureContents(input);

  return `${prefix}${contents}`;
};

export const createFunctionSignature = (fn: AbiFunction): string => {
  const functionInputsSignature = fn.inputs.map(createSignatureForType).join(',');
  return `${fn.name}(${functionInputsSignature})`;
};
