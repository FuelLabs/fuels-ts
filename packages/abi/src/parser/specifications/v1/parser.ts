import type { Abi } from '../../abi';

import { makeResolvedType } from './make-resolved-type';
import { mapAttribute } from './map-attribute';
import { ResolvableType } from './resolvable-type';
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
        (x) => x.type !== 'struct std::vec::RawVec' && x.type !== 'struct std::bytes::RawBytes'
      );

    const types = abi.concreteTypes.map((t) =>
      makeResolvedType(abi, resolvableTypes, t.concreteTypeId).toAbiType()
    );

    const getType = (typeId: string | number) => {
      const type = types.find((t) => t.concreteTypeId === typeId);
      if (type === undefined) {
        throw new Error(`Type with typeId ${typeId} not found`);
      }
      return type;
    };

    return {
      metadataTypes: resolvableTypes.map((rt) => rt.toAbiType()),
      types,
      specVersion: abi.specVersion,
      encodingVersion: abi.encodingVersion,
      programType: abi.programType,
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
