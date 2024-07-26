export interface ResolvedComponent {
  name: string;
  type: ResolvedType;
}

export class ResolvedType {
  constructor(
    public type: string,
    public typeId: string | number,
    public components: ResolvedComponent[] | undefined,
    public typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ) {}
}
