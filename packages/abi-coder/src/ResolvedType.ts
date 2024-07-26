export class ResolvedType {
  constructor(
    public type: string,
    public typeId: string | number,
    public components: { name: string; type: ResolvedType }[] | undefined,
    public typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ) {}
}
