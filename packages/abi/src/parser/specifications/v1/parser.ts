import { FuelError } from '@fuel-ts/errors';

import type { Abi, AbiConcreteType, AbiMetadataType } from '../../abi';

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
    const resolvableTypes = abi.metadataTypes
      .map((metadataType) => new ResolvableType(abi, metadataType.metadataTypeId, undefined))
      .filter(
        (resolveableType) =>
          resolveableType.swayType !== 'struct std::vec::RawVec' &&
          resolveableType.swayType !== 'struct std::bytes::RawBytes'
      );

    const concreteTypes = abi.concreteTypes.map((concreteType) => {
      const resolvableType = resolvableTypes.find(
        (resolvable) => resolvable.metadataTypeId === concreteType.metadataTypeId
      );

      const resolvedType = resolvableType
        ? resolvableType.resolve(concreteType)
        : new ResolvedType({ swayType: concreteType.type, typeId: concreteType.concreteTypeId });

      return resolvedType.toAbiType() as AbiConcreteType;
    });

    const getType = (concreteTypeId: string) => {
      const type = concreteTypes.find((abiType) => abiType.concreteTypeId === concreteTypeId);
      if (type === undefined) {
        throw new FuelError(
          FuelError.CODES.TYPE_ID_NOT_FOUND,
          `A type with concrete type id of "${concreteTypeId}" was not found.`
        );
      }
      return type;
    };

    return {
      metadataTypes: resolvableTypes.map((rt) => rt.toAbiType() as AbiMetadataType),
      concreteTypes,
      encodingVersion: abi.encodingVersion,
      programType: abi.programType as Abi['programType'],
      functions: abi.functions.map((fn: AbiFunctionV1) => ({
        attributes: fn.attributes?.map(mapAttribute) ?? undefined,
        name: fn.name,
        output: getType(fn.output),
        inputs: fn.inputs.map((input: AbiFunctionInputV1) => ({
          name: input.name,
          type: getType(input.concreteTypeId),
        })),
      })),
      loggedTypes: abi.loggedTypes.map((loggedType: AbiLoggedTypeV1) => ({
        logId: loggedType.logId,
        type: getType(loggedType.concreteTypeId),
      })),
      messageTypes: abi.messagesTypes.map((messageType: AbiMessageTypeV1) => ({
        messageId: messageType.messageId,
        type: getType(messageType.concreteTypeId),
      })),
      configurables: abi.configurables.map((configurable: AbiConfigurableV1) => ({
        name: configurable.name,
        offset: configurable.offset,
        type: getType(configurable.concreteTypeId),
      })),
    };
  }
}
