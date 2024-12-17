import type { Abi, AbiConcreteType, AbiMetadataType } from '../../abi';

import { toAbiType } from './abi-type-mappers';
import { cleanupAbi } from './cleanup-abi';
import { mapAttribute } from './map-attribute';
import { ResolvableType } from './resolvable-type';
import { ResolvedType } from './resolved-type';
import type {
  AbiConfigurableV1,
  AbiFunctionInputV1,
  AbiFunctionV1,
  AbiLoggedTypeV1,
  AbiMessageTypeV1,
  AbiSpecificationV1,
} from './specification';

export class AbiParserV1 {
  static parse(abi: AbiSpecificationV1): Abi {
    const cleanAbi = cleanupAbi(abi);

    const resolvableTypes = cleanAbi.metadataTypes.map(
      (metadataType) => new ResolvableType(cleanAbi, metadataType.metadataTypeId, undefined)
    );

    const concreteTypes = cleanAbi.concreteTypes.map((concreteType) => {
      const resolvableType = resolvableTypes.find(
        (resolvable) => resolvable.metadataTypeId === concreteType.metadataTypeId
      );

      const resolvedType = resolvableType
        ? resolvableType.resolve(concreteType)
        : new ResolvedType({ swayType: concreteType.type, typeId: concreteType.concreteTypeId });

      return toAbiType(resolvedType) as AbiConcreteType;
    });

    const getType = (concreteTypeId: string) =>
      // this will always be defined because it's in the context of the same ABI
      concreteTypes.find((abiType) => abiType.concreteTypeId === concreteTypeId) as AbiConcreteType;

    return {
      metadataTypes: resolvableTypes.map((rt) => toAbiType(rt) as AbiMetadataType),
      concreteTypes,
      encodingVersion: cleanAbi.encodingVersion,
      programType: cleanAbi.programType as Abi['programType'],
      functions: cleanAbi.functions.map((fn: AbiFunctionV1) => ({
        attributes: fn.attributes?.map(mapAttribute) ?? undefined,
        name: fn.name,
        output: getType(fn.output),
        inputs: fn.inputs.map((input: AbiFunctionInputV1) => ({
          name: input.name,
          type: getType(input.concreteTypeId),
        })),
      })),
      loggedTypes: cleanAbi.loggedTypes.map((loggedType: AbiLoggedTypeV1) => ({
        logId: loggedType.logId,
        type: getType(loggedType.concreteTypeId),
      })),
      messageTypes: cleanAbi.messagesTypes.map((messageType: AbiMessageTypeV1) => ({
        messageId: messageType.messageId,
        type: getType(messageType.concreteTypeId),
      })),
      configurables: cleanAbi.configurables.map((configurable: AbiConfigurableV1) => ({
        name: configurable.name,
        offset: configurable.offset,
        type: getType(configurable.concreteTypeId),
      })),
    };
  }
}
