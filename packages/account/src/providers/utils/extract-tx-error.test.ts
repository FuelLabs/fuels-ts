import { PANIC_REASONS } from '@fuel-ts/transactions/configs';
import * as asm from '@fuels/vm-asm';

/**
 * @group node
 * @group browser
 */
describe('extractTxError', () => {
  it('should ensure all panic reasons are present within PANIC_REASONS constant', async () => {
    // @ts-expect-error method reference missing in DTS
    await asm.initWasm();
    const panicReasons = asm.PanicReason;

    const stringReasons = Object.keys(panicReasons).filter((key) => Number.isNaN(Number(key)));

    expect(new Set(PANIC_REASONS)).toStrictEqual(new Set(stringReasons));
  });
});
