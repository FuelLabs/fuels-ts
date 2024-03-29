import type { GqlReceiptFragmentFragment } from '../../src/providers/__generated__/operations';
import { GqlReceiptType } from '../../src/providers/__generated__/operations';

export const MOCK_GQL_RECEIPT_FRAGMENT: GqlReceiptFragmentFragment = {
  receiptType: GqlReceiptType.Call,
  pc: '15488',
  is: '15488',
  __typename: 'Receipt',
  to: '0xfc69a2f25c26312fbecc7fce531eca80a2d315482c03fbc00d36b5cf065a0ac3',
  amount: '100',
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  gas: '499999489',
  param1: '1208122719',
  param2: '12568',
  id: '0xfc69a2f25c26312fbecc7fce531eca80a2d315482c03fbc00d36b5cf065a0ac3',
  contractId: '0xfc69a2f25c26312fbecc7fce531eca80a2d315482c03fbc00d36b5cf065a0ac3',
  val: '1',
  ptr: '13296',
  digest: '0x5df9236f59b3efbbd5737ae43edaf76587e2820cff27a6d9f1cd7750fa592028',
  len: '160',
  data: '0x10000000',
  reason: '176766285424623616',
  ra: '202',
  rb: '186',
  rc: '122',
  rd: '78',
  result: '24',
  gasUsed: '894',
  sender: '0x06765b9a03da4fbf65443e5dd69b71a5969c1521e819990a44f49954a6b425d1',
  recipient: '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263',
  nonce: '0x343628340232f09d8183a89c22b4edf6b615d8edd30b72945d04d6829ba86b85',
  subId: '0x0000000000000000000000000000000000000000000000000000000000000000',
};

export const MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS: GqlReceiptFragmentFragment = {
  ...MOCK_GQL_RECEIPT_FRAGMENT,
  to: null,
  toAddress: '0xfc69a2f25c26312fbecc7fce531eca80a2d315482c03fbc00d36b5cf065a0ac3',
};
