import { ZERO } from '../utils';

class SparseMerkleSolidityNode {
  digest: string;
  prefix: string;
  leftChildPtr: string;
  rightChildPtr: string;
  key: string;
  leafData: string;

  constructor(rawData: string) {
    // Not interested in digest or children of Sibling / NonMembershipLeaf
    this.digest = ZERO;
    this.leftChildPtr = ZERO;
    this.rightChildPtr = ZERO;

    // If the data is empty, return a null node
    if (rawData === '') {
      this.prefix = '0x00';
      this.key = ZERO;
      this.leafData = '0x';
    }
    // Otherwise, check is data implies leaf or node, and set properties accordingly
    else {
      this.prefix = rawData.slice(0, 4);
      if (this.prefix === '0x01') {
        this.key = ZERO;
        this.leafData = '0x';
      } else {
        this.key = '0x'.concat(rawData.slice(4, 68));
        this.leafData = '0x'.concat(rawData.slice(68, 132));
      }
    }
  }
}

export default SparseMerkleSolidityNode;
