export interface IAbiTypeRoot {
  type: string; // type name
  typeId: number; // type id (others will reference it)
  components: null | IAbiTypeComponent[];
  typeParameters: null | Record<string, unknown>[];
}

export interface IAbiTypeComponent {
  name: string; // type name
  type: number; // foreing key for `typeId` (on `root` nodes)
  components?: null | IAbiTypeComponent[];
  typeArguments: null | Record<string, unknown>[];
}
