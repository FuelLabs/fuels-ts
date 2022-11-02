export interface IRawAbiTypeRoot {
  type: string; // type name
  typeId: number; // type id (others will reference it)
  components: null | IRawAbiTypeComponent[];
  typeParameters: null | number[];
}

export interface IRawAbiTypeComponent {
  name: string; // type name
  type: number; // foreing key for `typeId` (on `root` nodes)
  components?: null | IRawAbiTypeComponent[];
  typeArguments: null | number[];
}
