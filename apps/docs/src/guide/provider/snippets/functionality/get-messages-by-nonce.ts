// #region getMessageByNonce
import { launchTestNode } from 'fuels/test-utils';

const { provider } = await launchTestNode({
  nodeOptions: {
    snapshotConfig: {
      stateConfig: {
        messages: [
          {
            sender:
              '0x22cae5308938e8b4caf217b6464884f6331eff05e81468df8ccd08126effc8d0',
            recipient:
              '0x8d2af98a4198732a46bf65d87a73427dd7608acaad2414585d8ccdd6f59c437b',
            nonce:
              '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0',
            amount: 100_000,
            data: '',
            da_height: 0,
          },
        ],
      },
    },
  },
});

const nonce =
  '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0';
const message = await provider.getMessageByNonce(nonce);
// #endregion getMessageByNonce

console.log('message', message);
