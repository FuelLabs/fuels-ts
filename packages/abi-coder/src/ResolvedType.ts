export class ResolvedType {
  constructor(
    public type: string,
    public metadataTypeId: number | undefined,
    public components: { name: string; type: ResolvedType }[] | undefined,
    public typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ) {}
}
