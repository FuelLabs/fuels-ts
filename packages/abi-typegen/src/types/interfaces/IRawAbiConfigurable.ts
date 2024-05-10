export interface IRawAbiConfigurable {
  name: string;
  configurableType: IRawAbiConfigurableType;
  offset: number;
}

export interface IRawAbiConfigurableType {
  name: string;
  type: number;
  typeArguments: null | IRawAbiConfigurableType[];
}
