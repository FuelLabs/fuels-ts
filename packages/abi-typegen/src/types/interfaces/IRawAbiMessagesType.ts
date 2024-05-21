export interface IRawAbiMessagesType {
  messageDataType: IRawAbiMessageDataType;
}

export interface IRawAbiMessageDataType {
  type: number;
  typeArguments: null | IRawAbiMessageDataType[];
}
