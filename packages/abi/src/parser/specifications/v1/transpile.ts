import type {
  Abi,
  AbiConfigurable,
  AbiFunction,
  AbiFunctionInput,
  AbiLoggedType,
  AbiMessageType,
  AbiType,
} from '../../abi';

import type {
  AbiConcreteTypeV1,
  AbiConfigurableV1,
  AbiFunctionInputV1,
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

  public getByTypeId(typeId: number | string): {
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

interface AggregateType {
  concreteType?: AbiConcreteTypeV1;
  metadataType?: AbiMetadataTypeV1;

  name?: string;
  type: string | undefined; // e.g. struct GenericNestedLevelOne

  // concreteType: string | undefined; // e.g. struct GenericNestedLevelOne<u8>
  // concreteTypeId: string | undefined; // e.g. 0x1234

  // metadataType: string | undefined; // e.g. struct GenericNestedLevelOne
  // metadataTypeId: number | undefined; // e.g. 0x1234

  componentArguments?: Record<number, string | TypeArgumentV1>;
  components?: AggregateType[];
}

class TypeIterator {
  public constructor(private repository: TypeRepository) {}

  public *iterateByTypeId(el: (number | string)[]): IterableIterator<AggregateType> {
    const inputs = el.map((typeId) => ({ typeId }));
    return this.iterate(inputs);
  }

  public *iterateByComponents(
    element: readonly (TypeArgumentV1 | ComponentV1)[]
  ): IterableIterator<AggregateType> {
    const inputs = [...element];
    return this.iterate(inputs);
  }

  private *iterate(stack: Pick<ComponentV1, 'typeId'>[]): IterableIterator<AggregateType> {
    let element;

    while ((element = stack.pop())) {
      if (!element) {
        return;
      }

      let { concreteType, metadataType } = this.repository.getByTypeId(element.typeId);
      yield this.createAggregateType(concreteType, metadataType, undefined);
    }
  }

  private getTypeById(typeId: string | number) {
    return this.repository.getByTypeId(typeId);
  }

  private createAggregateType(
    concreteType?: AbiConcreteTypeV1,
    metadataType?: AbiMetadataTypeV1,
    name?: string,
    parentTypeArguments: Record<number, string | TypeArgumentV1> = {}
  ): AggregateType {
    // const typeParameters = metadataType?.typeParameters ?? [];
    // const typeArguments = concreteType?.typeArguments ?? parentTypeArguments ?? [];
    // const typeArguments = this.createTypeArguments(
    //   typeParameters,
    //   concreteType?.typeArguments ?? [],
    //   parentTypeArguments
    // );
    // const componentArguments = this.createComponentArguments(typeParameters, typeArguments);

    return {
      name,
      type: metadataType?.type ?? concreteType?.type,
      // componentArguments,
      components: metadataType?.components
        ? Array.from(this.iterateByComponents(metadataType.components))
        : undefined,

      // concreteType: concreteType?.type,
      // concreteTypeId: concreteType?.concreteTypeId,

      // metadataType: metadataType?.type,
      // metadataTypeId: metadataType?.metadataTypeId,

      // typeParameters: metadataType?.typeParameters,
      // typeArguments: concreteType?.typeArguments,
    };
  }
}

export class ParserV1 {
  private typeIterator: TypeIterator;

  public constructor(abi: AbiSpecificationV1) {
    const repository = new TypeRepository(abi);
    this.typeIterator = new TypeIterator(repository);
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
    return {} as AbiType;
  }

  private parseFunctionInputs(inputs: readonly AbiFunctionInputV1[]): AbiFunctionInput[] {
    return [];
  }

  private parseFunction = (func: AbiFunctionV1): AbiFunction => ({
    name: func.name,
    inputs: this.parseFunctionInputs(func.inputs),
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
