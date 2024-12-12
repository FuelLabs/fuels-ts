// #region getMessageByNonce
import { launchTestNode, TestMessage } from 'fuels/test-utils';

const { provider } = await launchTestNode({
  nodeOptions: {
    snapshotConfig: {
      stateConfig: {
        messages: [
          new TestMessage({
            nonce:
              '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0',
          }).toChainMessage(),
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
