/* eslint-disable max-classes-per-file */
import type {
  Abi,
  AbiConfigurable,
  AbiFunction,
  AbiLoggedType,
  AbiMessageType,
  AbiType,
  AbiTypeComponent,
} from '../../abi';

import type {
  AbiConcreteTypeV1,
  AbiConfigurableV1,
  AbiFunctionV1,
  AbiLoggedTypeV1,
  AbiMessageTypeV1,
  AbiMetadataTypeV1,
  AbiSpecificationV1,
  ComponentV1,
  TypeArgumentV1,
} from './specification';

type ComponentArgumentV1 = [number, string | TypeArgumentV1];

class TypeRepository {
  private concreteTypes: Map<string, AbiConcreteTypeV1> = new Map();
  private metadataTypes: Map<number, AbiMetadataTypeV1> = new Map();

  public constructor(abi: AbiSpecificationV1) {
    abi.concreteTypes.forEach((concreteType) => {
      this.concreteTypes.set(concreteType.concreteTypeId, concreteType);
    });
    abi.metadataTypes.forEach((metadataType) => {
      this.metadataTypes.set(metadataType.metadataTypeId, metadataType);
    });
  }

  public getTypeByTypeId(
    typeId: number | string,
    parentComponentArguments: ComponentArgumentV1[] = []
  ): AbiType {
    const { concreteType, metadataType } = this.getTypesByTypeId(typeId);

    const componentArguments = this.getComponentArguments(
      metadataType?.typeParameters,
      concreteType?.typeArguments
    );

    return {
      typeId: concreteType?.concreteTypeId ?? 'unknown',
      swayType: metadataType?.type ?? concreteType?.type ?? 'unknown',

      metadataTypeId: metadataType?.metadataTypeId,
      metadataType: metadataType?.type,

      componentArguments,
      components: metadataType?.components?.map((component) => ({
        name: component.name,
        type: this.getTypeByTypeId(component.typeId, componentArguments),
      })),
    };
  }

  private getTypesByTypeId(typeId: number | string): {
    concreteType?: AbiConcreteTypeV1;
    metadataType?: AbiMetadataTypeV1;
  } {
    const isConcreteType = typeof typeId === 'string';
    const concreteType = isConcreteType ? this.concreteTypes.get(typeId) : undefined;

    const metadataTypeId = isConcreteType ? concreteType?.metadataTypeId : typeId;
    const metadataType = metadataTypeId ? this.metadataTypes.get(metadataTypeId) : undefined;

    return { concreteType, metadataType };
  }

  private getComponentArguments(
    typeParameters?: readonly number[],
    typeArguments?: readonly (string | TypeArgumentV1)[]
  ): ComponentArgumentV1[] {
    if (!typeParameters || !typeArguments) {
      return [];
    }

    return typeParameters.map((typeParameterId, index) => {
      const typeArgument = typeArguments[index];
      return [typeParameterId, typeArgument];
    });
  }
}

export class ParserV1 {
  private typesRepository: TypeRepository;

  public constructor(abi: AbiSpecificationV1) {
    this.typesRepository = new TypeRepository(abi);
  }

  public static parse(abi: AbiSpecificationV1): Abi {
    const { specVersion, encodingVersion, programType } = abi;

    const parser = new ParserV1(abi);
    const { functions, loggedTypes, messagesTypes, configurables } = abi;

    return {
      specVersion,
      encodingVersion,
      programType,

      functions: functions.map(parser.parseFunction),
      loggedTypes: loggedTypes.map(parser.parseLoggedType),
      messagesTypes: messagesTypes.map(parser.parseMessageType),
      configurables: configurables.map(parser.parseConfigurables),
    };
  }

  private parseType(concreteTypeId: string): AbiType {
    return this.typesRepository.getTypeByTypeId(concreteTypeId);
  }

  private parseFunction = (func: AbiFunctionV1): AbiFunction => ({
    name: func.name,
    inputs: func.inputs.map((input) => ({
      name: input.name,
      type: this.parseType(input.concreteTypeId),
    })),
    output: this.parseType(func.output),
    attributes: func.attributes ?? undefined,
  });

  private parseLoggedType = (loggedType: AbiLoggedTypeV1): AbiLoggedType => ({
    logId: loggedType.logId,
    type: this.parseType(loggedType.concreteTypeId),
  });

  private parseMessageType = (messageType: AbiMessageTypeV1): AbiMessageType => ({
    messageId: messageType.messageId,
    type: this.parseType(messageType.concreteTypeId),
  });

  private parseConfigurables = (configurable: AbiConfigurableV1): AbiConfigurable => ({
    name: configurable.name,
    offset: configurable.offset,
    type: this.parseType(configurable.concreteTypeId),
  });
}
