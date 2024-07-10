export interface JsonAbiMessagesType {
  messageDataType: IRawAbiMessageDataType;
}

export interface IRawAbiMessageDataType {
  type: number;
  typeArguments: null | IRawAbiMessageDataType[];
}
