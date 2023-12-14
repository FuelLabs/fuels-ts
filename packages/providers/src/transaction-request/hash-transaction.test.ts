import { bn } from '@fuel-ts/math';
import { clone } from 'ramda';

import { SCRIPT_TX_REQUEST } from '../../test/fixtures/transaction-request';

import { hashTransaction } from './hash-transaction';

describe('hashTransaction', () => {
  it('Hash script transaction request', () => {
    expect(hashTransaction(SCRIPT_TX_REQUEST, 0)).toEqual(
      '0x7645fa2154ee610469ebc876d0cb7b6fcf390fb97f2c6b88a2344cc23533fa39'
    );
  });

  it('Hash script transaction with predicateGas', () => {
    const txRequest = clone(SCRIPT_TX_REQUEST);

    txRequest.inputs = [
      ...txRequest.inputs,
      {
        type: 2,
        amount: '0x0',
        sender: '0x00000000000000000000000059f2f1fcfe2474fd5f0b9ba1e73ca90b143eb8d0',
        recipient: '0x809f80a984a60d641d4a6d284e3969ff380eb478e587bcba0ed1a3f0ef271ede',
        witnessIndex: 0,
        data: '0x3b42028d86539b607afeaf8d32501fa03c494ecad7e65a16a7a8ebc264f4b67a000000000000000000000000dadd1125b8df98a66abd5eb302c0d9ca5a061dc200000000000000000000000090f79bf6eb2c4f870365e785982e1f101e93b906456bdaffaf74fe03521754ac445d148033c0c6acf7d593132c43f92fdbc7324c0000000000000000000000000000000000000000000000008ac7230489e80000',
        nonce: '0x0000000000000000000000000000000000000000000000000000000000000002',
        predicate:
          '0x1a405000910000206144000b6148000540411480504cc04c72580020295134165b501012615c000772680002595d7001616171015b61a0106165711a5b6400125b5c100b2404000024000000664e627bfc0db0bfa8f182efc913b552681143e328b555d9697c40ad0eb527ad',
        predicateGasUsed: bn(25),
      },
    ];

    expect(hashTransaction(txRequest, 0)).toEqual(
      '0xf3f6ef8a9e6a495fbe4998d8cb197550aecf1eb9e89ce10cf13a8b03bd4dfb6a'
    );
  });
});
