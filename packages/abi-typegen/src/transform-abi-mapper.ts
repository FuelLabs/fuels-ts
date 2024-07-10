import type {
  JsonAbiArgument,
  JsonAbiType,
  JsonAbi,
  JsonAbiArgumentWithoutName,
} from './types/interfaces/JsonAbi';

function mapComponent(c: JsonAbiArgumentWithoutName | JsonAbiArgument): JsonAbiArgument {
  return {
    name: 'name' in c ? c.name : '',
    type: c.type.toString(),
    typeArguments: c.typeArguments?.map(mapComponent) ?? null,
  };
}
function mapType(type: JsonAbiType): JsonAbiType {
  return {
    type: type.type,
    components: type.components?.map(mapComponent) ?? null,
    typeId: type.typeId.toString(),
    typeParameters: type.typeParameters?.map((x) => x.toString()) ?? null,
  };
}

export function mapAbi(contents: JsonAbi) {
  return {
    abiVersion: '1',
    specVersion: '1',
    encoding: '1',
    types: contents.types.map(mapType),
    functions:
      contents.functions.map((x) => ({
        ...x,
        inputs: x.inputs.map(mapComponent),
        output: mapComponent(x.output),
      })) ?? null,
    loggedTypes: contents.loggedTypes?.map((l) => ({
      logId: l.logId.toString(),
      loggedType: mapComponent(l.loggedType),
    })),
    messagesTypes: [],
    configurables: contents.configurables.map((x) => ({
      ...x,
      configurableType: mapComponent(x.configurableType),
    })),
  } as JsonAbi;
}
