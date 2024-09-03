import type {
  Abi,
  AbiConfigurable,
  AbiFunction,
  AbiLoggedType,
  AbiMessageType,
} from '../../abi-parser-types';

import type { JsonAbi_V1 } from './abi-specification-v1';
import { makeResolvedType } from './make-resolved-type';
import { ResolvableType } from './resolvable-type';

export class AbiV1 implements Abi {
  public specVersion: string;
  public encodingVersion: string;
  public programType: string;
  public functions: AbiFunction[];
  public loggedTypes: AbiLoggedType[];
  public messageTypes: AbiMessageType[];
  public configurables: AbiConfigurable[];

  constructor(public jsonAbi: JsonAbi_V1) {
    const resolvableTypes = jsonAbi.metadataTypes.map(
      (mt) => new ResolvableType(jsonAbi, mt.metadataTypeId, undefined)
    );

    const types = jsonAbi.concreteTypes.map((t) =>
      makeResolvedType(jsonAbi, resolvableTypes, t.concreteTypeId).toAbiType()
    );

    this.specVersion = jsonAbi.specVersion;
    this.encodingVersion = jsonAbi.encodingVersion;
    this.programType = jsonAbi.programType;

    this.functions = jsonAbi.functions.map((fn) => ({
      attributes: fn.attributes ?? undefined,
      name: fn.name,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      output: types.find((t) => t.typeId === fn.output)!,
      inputs: fn.inputs.map((i) => ({
        name: i.name,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        type: types.find((t) => t.typeId === i.concreteTypeId)!,
      })),
    }));

    this.loggedTypes = jsonAbi.loggedTypes.map((lt) => ({
      logId: lt.logId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      type: types.find((t) => t.typeId === lt.concreteTypeId)!,
    }));

    this.messageTypes = jsonAbi.messagesTypes.map((mt) => ({
      messageId: mt.message_id,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      type: types.find((t) => t.typeId === mt.concreteTypeId)!,
    }));

    this.configurables = jsonAbi.configurables.map((c) => ({
      name: c.name,
      offset: c.offset,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      type: types.find((t) => t.typeId === c.concreteTypeId)!,
    }));
  }
}
