import { Address } from '@fuel-ts/address';
import { bn } from '@fuel-ts/math';

import {
  GqlHeaderVersion,
  type GqlGetMessageProofQuery,
} from '../../src/providers/__generated__/operations';
import type { MessageProof } from '../../src/providers/message';

export const MESSAGE_PROOF_RAW_RESPONSE: GqlGetMessageProofQuery['messageProof'] = {
  messageProof: {
    proofSet: ['0x34fdfbc73458998a106b02f13bba51bc0fd36513602e312ca1d1893f2075eca5'],
    proofIndex: '0',
  },
  blockProof: {
    proofSet: [
      '0x3480098c927d3a8a86745ba6c91419f04901baf5d25bbd0e6ba56fcb3b3e35bd',
      '0xa8795e5d15b88c2383f5673a4658edae93dcdb7986ccfacbe916e656ec11ce70',
      '0x97ea3aee8cb9ccc6593c21879979eeab0f748066b9e22e2294cb973ee5d95e3c',
      '0x50a33f4fe58e35955df499092515fe2f77d7bfaed35f80194b338d7091c363ab',
      '0xa07fc684d351ab1970efe9ffd04eb67b6544dd4443169ecf6dd0bfc546216211',
    ],
    proofIndex: '432',
  },
  messageBlockHeader: {
    version: GqlHeaderVersion.V1,
    id: '0x864b55089878bf7009d2ff64cbeeeeb75fcd73768785dcb75d54180e7fbaab7b',
    daHeight: '0',
    transactionsCount: '2',
    transactionsRoot: '0xbf760e126159b72f59bde2d59a972620f826e5a5134deb2a775a21c37644e1a1',
    messageReceiptCount: '1',
    height: '432',
    prevRoot: '0x26e49e4af2253e0bca68d2a8b38fa7406a546ebc476b6ca51569cb325ad55ea6',
    time: '4611686020115956241',
    applicationHash: '0x76b6838a38a3049fa1dd42f923a0f287594a390493003af0f1c3da94f3d2b8c7',
    consensusParametersVersion: '0',
    stateTransitionBytecodeVersion: '0',
    eventInboxRoot: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    messageOutboxRoot: '0x8817eb3173bc39ae465def50f978153fd84ea4badbe3a4e26486ba7f1bcd0579',
  },
  commitBlockHeader: {
    version: GqlHeaderVersion.V1,
    id: '0xe4dfe8fc1b5de2c669efbcc5e4c0a61db175d1b2f03e3cd46ed4396e76695c5b',
    daHeight: '0',
    transactionsCount: '2',
    transactionsRoot: '0x471d68713ae2fef6bb3eede37a976b38390f2ab8916e463b22942e7130456a8a',
    messageReceiptCount: '0',
    height: '433',
    prevRoot: '0xcc024475c2ccd175082bc233f5ebb3736e47a648a666d82567b001ab46cf0a83',
    time: '4611686020115956241',
    applicationHash: '0x441dece8e41d111f3a875ed89d716e48abf450ad385b111cf7c55e06e0b57d6b',
    consensusParametersVersion: '0',
    stateTransitionBytecodeVersion: '0',
    eventInboxRoot: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    messageOutboxRoot: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },
  sender: '0x79c54219a5c910979e5e4c2728df163fa654a1fe03843e6af59daa2c3fcd42ea',
  recipient: '0x00000000000000000000000047ba61eec8e5e65247d717ff236f504cf3b0a263',
  nonce: '0x3e87e0f44613cabecd1aad381ad41a433afb12ec5c54c172de3db25b1b4d1b53',
  amount: '10',
  data: '0x',
};

export const MESSAGE_PROOF: MessageProof = {
  messageProof: {
    proofIndex: bn(MESSAGE_PROOF_RAW_RESPONSE.messageProof.proofIndex),
    proofSet: MESSAGE_PROOF_RAW_RESPONSE.messageProof.proofSet,
  },
  blockProof: {
    proofIndex: bn(MESSAGE_PROOF_RAW_RESPONSE.blockProof.proofIndex),
    proofSet: MESSAGE_PROOF_RAW_RESPONSE.blockProof.proofSet,
  },
  messageBlockHeader: {
    id: MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.id,
    daHeight: bn(MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.daHeight),
    transactionsCount: Number(MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.transactionsCount),
    transactionsRoot: MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.transactionsRoot,
    height: bn(MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.height),
    prevRoot: MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.prevRoot,
    time: MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.time,
    applicationHash: MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.applicationHash,
    messageReceiptCount: Number(MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.messageReceiptCount),
    consensusParametersVersion: Number(
      MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.consensusParametersVersion
    ),
    stateTransitionBytecodeVersion: Number(
      MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.stateTransitionBytecodeVersion
    ),
    eventInboxRoot: MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.eventInboxRoot,
    messageOutboxRoot: MESSAGE_PROOF_RAW_RESPONSE.messageBlockHeader.messageOutboxRoot,
  },
  commitBlockHeader: {
    id: MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.id,
    daHeight: bn(MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.daHeight),
    transactionsCount: Number(MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.transactionsCount),
    transactionsRoot: MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.transactionsRoot,
    height: bn(MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.height),
    prevRoot: MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.prevRoot,
    time: MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.time,
    applicationHash: MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.applicationHash,
    messageReceiptCount: Number(MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.messageReceiptCount),
    consensusParametersVersion: Number(
      MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.consensusParametersVersion
    ),
    stateTransitionBytecodeVersion: Number(
      MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.stateTransitionBytecodeVersion
    ),
    eventInboxRoot: MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.eventInboxRoot,
    messageOutboxRoot: MESSAGE_PROOF_RAW_RESPONSE.commitBlockHeader.messageOutboxRoot,
  },
  sender: Address.fromAddressOrString(MESSAGE_PROOF_RAW_RESPONSE.sender),
  recipient: Address.fromAddressOrString(MESSAGE_PROOF_RAW_RESPONSE.recipient),
  nonce: MESSAGE_PROOF_RAW_RESPONSE.nonce,
  amount: bn(MESSAGE_PROOF_RAW_RESPONSE.amount),
  data: MESSAGE_PROOF_RAW_RESPONSE.data,
};
