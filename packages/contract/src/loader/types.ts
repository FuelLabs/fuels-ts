export type ContractChunk = {
  id: number;
  size: number;
  bytecode: Uint8Array;
  blobId?: string;
};
