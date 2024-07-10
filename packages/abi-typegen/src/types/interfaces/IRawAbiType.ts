export interface JsonAbiType {
  type: string; // type name
  typeId: number; // type id (others will reference it)
  components: null | JsonAbiArgument[];
  typeParameters: null | number[];
}

export interface JsonAbiArgument {
  name: string; // type name
  type: number; // foreing key for `typeId` (on `root` nodes)
  typeArguments: null | JsonAbiArgument[];
}
