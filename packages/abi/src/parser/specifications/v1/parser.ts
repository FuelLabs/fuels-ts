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

  public getConcreteTypeById(concreteTypeId: string): AbiConcreteTypeV1 | undefined {
    return this.concreteTypes.get(concreteTypeId);
  }

  public getMetadataTypeById(metadataTypeId: number): AbiMetadataTypeV1 | undefined {
    return this.metadataTypes.get(metadataTypeId);
  }

  public getTypesByTypeId(typeId: number | string): {
    concreteType?: AbiConcreteTypeV1;
    metadataType?: AbiMetadataTypeV1;
  } {
    const isConcreteType = typeof typeId === 'string';
    const concreteType = isConcreteType ? this.concreteTypes.get(typeId) : undefined;

    const metadataTypeId = isConcreteType ? concreteType?.metadataTypeId : typeId;
    const metadataType = metadataTypeId ? this.metadataTypes.get(metadataTypeId) : undefined;

    return { concreteType, metadataType };
  }
}

export class TypeFactory {
  public constructor(private typesRepository: TypeRepository) {}

  public createFromConcreteId(concreteTypeId: string): AbiType {
    const concreteType = this.typesRepository.getConcreteTypeById(concreteTypeId);
    if (!concreteType) {
      throw new Error(`Unable to find concrete type with id "${concreteTypeId}"`);
    }

    let components: AbiTypeComponent[] | undefined;

    if (concreteType.metadataTypeId) {
      const metadataType = this.typesRepository.getMetadataTypeById(concreteType.metadataTypeId);
      components = this.createComponents(
        metadataType?.components,
        metadataType?.typeParameters,
        concreteType.typeArguments
      );
    }

    return {
      swayType: concreteType.type,
      typeId: concreteType.concreteTypeId,
      components,
    };
  }

  private createComponents(
    components?: readonly ComponentV1[],
    typeParameters?: readonly number[],
    typeArguments?: readonly string[]
  ): AbiTypeComponent[] | undefined {
    // There are no components, therefore nothing to do.
    if (!components) {
      return undefined;
    }

    // We take the name off the component to leave us with just the TypeArgumentV1.
    return components.map(
      ({ name, ...component }: ComponentV1): AbiTypeComponent => ({
        name,
        type: this.createComponentType(component, typeParameters, typeArguments),
      })
    );
  }

  private createComponentType(
    { typeId, typeArguments: componentTypeArguments }: TypeArgumentV1,
    typeParameters: readonly number[] | undefined,
    typeArguments: readonly string[] | undefined
  ): AbiType {
    // const typeParameterIndex = typeParameters?.findIndex(typeId);

    const { concreteType, metadataType } = this.typesRepository.getTypesByTypeId(typeId);
    const resolvedComponentTypeArguments = componentTypeArguments?.map((componentTypeArgument) =>
      this.createComponentType(componentTypeArgument, typeParameters, typeArguments)
    );

    return {
      swayType: metadataType?.type ?? '',
      // type: metadataType?.type,
      typeId: concreteType?.concreteTypeId ?? '',
      // metadataTypeId: concreteType?.metadataTypeId ?? undefined,
      // componentTypeArguments,
      // resolvedComponentTypeArguments,
      components: this.createComponents(
        metadataType?.components,
        metadataType?.typeParameters,
        typeArguments
      ),
    };
  }
}

export class AbiParserV1 {
  private typesRepository: TypeRepository;
  private typeFactory: TypeFactory;

  public constructor(abi: AbiSpecificationV1) {
    this.typesRepository = new TypeRepository(abi);
    this.typeFactory = new TypeFactory(this.typesRepository);
  }

  public static parse(abi: AbiSpecificationV1): Abi {
    const { specVersion, encodingVersion, programType } = abi;

    const parser = new AbiParserV1(abi);
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
    return this.typeFactory.createFromConcreteId(concreteTypeId);
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
