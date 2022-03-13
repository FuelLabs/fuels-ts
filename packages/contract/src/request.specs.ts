/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrayify } from '@ethersproject/bytes';

interface TransactionRequestSpec {
  contractId: string;
  scriptData: any;
  overrides: any;
  transactionSpec: any;
}

export default [
  [
    {
      contractId: '0x012b77e3fdaa1c70197818a5168a45e6ab337a02dda3c99967321047da9327c0',
      scriptData: arrayify('0x0000000013ddc66f'),
      overrides: {},
      transactionSpec: {
        type: 0,
        gasPrice: 0,
        gasLimit: 1000000,
        bytePrice: 0,
        script: arrayify('0x504001e82d40040a2434000047000000'),
        scriptData: arrayify(
          '0x012b77e3fdaa1c70197818a5168a45e6ab337a02dda3c99967321047da9327c00000000013ddc66f'
        ),
        inputs: [
          {
            type: 1,
            contractId: '0x012b77e3fdaa1c70197818a5168a45e6ab337a02dda3c99967321047da9327c0',
          },
        ],
        outputs: [
          {
            type: 1,
            inputIndex: 0,
          },
        ],
      },
    },
  ],
  [
    {
      contractId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      scriptData: arrayify(
        '0x0000000067ac6a050000000000000001666f6f00000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
      ),
      overrides: {
        inputs: [
          {
            type: 0,
            id: '0xefe2937354e847dd25e6d31aece8a195379a01e8ab365bdd492628d41d8c506300',
            status: 'UNSPENT',
            assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
            amount: {
              type: 'BigNumber',
              hex: '0x01',
            },
            owner: '0x09ea14b677b62562c9da07b8d0ac285968f19ca222d8e8e3283360aad35cc02c',
            maturity: {
              type: 'BigNumber',
              hex: '0x00',
            },
            blockCreated: {
              type: 'BigNumber',
              hex: '0x2993',
            },
            witnessIndex: 0,
          },
        ],
        outputs: [
          {
            type: 3,
            assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
            to: '0x09ea14b677b62562c9da07b8d0ac285968f19ca222d8e8e3283360aad35cc02c',
          },
        ],
      },
      transactionSpec: {
        type: 0,
        gasPrice: 0,
        gasLimit: 1000000,
        bytePrice: 0,
        script: arrayify('0x504001e82d40040a2434000047000000'),
        scriptData: arrayify(
          '0x00000000000000000000000000000000000000000000000000000000000000000000000067ac6a050000000000000218666f6f00000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
        ),
        inputs: [
          {
            type: 1,
            contractId: '0x0000000000000000000000000000000000000000000000000000000000000000',
          },
          {
            type: 0,
            id: '0xefe2937354e847dd25e6d31aece8a195379a01e8ab365bdd492628d41d8c506300',
            status: 'UNSPENT',
            assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
            amount: {
              type: 'BigNumber',
              hex: '0x01',
            },
            owner: '0x09ea14b677b62562c9da07b8d0ac285968f19ca222d8e8e3283360aad35cc02c',
            maturity: {
              type: 'BigNumber',
              hex: '0x00',
            },
            blockCreated: {
              type: 'BigNumber',
              hex: '0x2993',
            },
            witnessIndex: 0,
          },
        ],
        outputs: [
          {
            type: 1,
            inputIndex: 0,
          },
          {
            type: 3,
            assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
            to: '0x09ea14b677b62562c9da07b8d0ac285968f19ca222d8e8e3283360aad35cc02c',
          },
        ],
      },
    },
  ],
  [
    {
      contractId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      scriptData: arrayify(
        '0x0000000067ac6a050000000000000001666f6f00000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
      ),
      overrides: [
        {
          gasPrice: 1000,
          inputs: [
            {
              type: 0,
              id: '0xefe2937354e847dd25e6d31aece8a195379a01e8ab365bdd492628d41d8c506300',
              status: 'UNSPENT',
              assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
              amount: {
                type: 'BigNumber',
                hex: '0x01',
              },
              owner: '0x09ea14b677b62562c9da07b8d0ac285968f19ca222d8e8e3283360aad35cc02c',
              maturity: {
                type: 'BigNumber',
                hex: '0x00',
              },
              blockCreated: {
                type: 'BigNumber',
                hex: '0x2993',
              },
              witnessIndex: 0,
            },
          ],
          outputs: [
            {
              type: 3,
              assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
              to: '0x09ea14b677b62562c9da07b8d0ac285968f19ca222d8e8e3283360aad35cc02c',
            },
          ],
        },
        {
          gasPrice: 2000,
          outputs: [
            {
              type: 3,
              assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
              to: '0x09ea14b677b62562c9da07b8d0ac285968f19ca222d8e8e3283360aad35cc02c',
            },
          ],
        },
      ],
      transactionSpec: {
        type: 0,
        gasPrice: 2000,
        gasLimit: 1000000,
        bytePrice: 0,
        script: arrayify('0x504001e82d40040a2434000047000000'),
        scriptData: arrayify(
          '0x00000000000000000000000000000000000000000000000000000000000000000000000067ac6a050000000000000218666f6f00000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
        ),
        inputs: [
          {
            type: 1,
            contractId: '0x0000000000000000000000000000000000000000000000000000000000000000',
          },
          {
            type: 0,
            id: '0xefe2937354e847dd25e6d31aece8a195379a01e8ab365bdd492628d41d8c506300',
            status: 'UNSPENT',
            assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
            amount: {
              type: 'BigNumber',
              hex: '0x01',
            },
            owner: '0x09ea14b677b62562c9da07b8d0ac285968f19ca222d8e8e3283360aad35cc02c',
            maturity: {
              type: 'BigNumber',
              hex: '0x00',
            },
            blockCreated: {
              type: 'BigNumber',
              hex: '0x2993',
            },
            witnessIndex: 0,
          },
        ],
        outputs: [
          {
            type: 1,
            inputIndex: 0,
          },
          {
            type: 3,
            assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
            to: '0x09ea14b677b62562c9da07b8d0ac285968f19ca222d8e8e3283360aad35cc02c',
          },
          {
            type: 3,
            assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
            to: '0x09ea14b677b62562c9da07b8d0ac285968f19ca222d8e8e3283360aad35cc02c',
          },
        ],
      },
    },
  ],
] as Array<Array<TransactionRequestSpec>>;
