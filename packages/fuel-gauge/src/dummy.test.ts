import type { TransactionScript } from 'fuels';
import { ContractFactory, hexlify } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ScriptDummy } from '../test/typegen';

describe('first try', () => {
  it('should deploy blob for a script transaction and submit it', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
      provider,
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const { waitForResult } = await factory.deployAsBlobTxForScript();

    const { transactionResult } = await waitForResult();

    const scriptBytes = hexlify(ScriptDummy.bytecode);
    const actualBytes = hexlify(
      (transactionResult.transaction as unknown as TransactionScript).script
    );
    console.log('Original Script Bytes: ', scriptBytes);
    console.log('###########################################');
    console.log('Actually Script Bytes: ', actualBytes);

    expect(scriptBytes).not.equal(actualBytes);
  });
});
