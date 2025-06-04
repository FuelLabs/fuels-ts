import { hashMessage } from './hashMessage';

/**
 * @group node
 * @group browser
 */
describe('hashMessage', () => {
  it('should hash a message [string]', () => {
    const message: string = 'my message';
    const expectHashedMessage =
      '0xea38e30f75767d7e6c21eba85b14016646a3b60ade426ca966dac940a5db1bab';
    expect(hashMessage(message)).toEqual(expectHashedMessage);
  });

  it('should hash a raw message [{ personalSign: string }]', () => {
    const data: string = 'my message';
    const expectHashedMessage =
      '0x615128eb1ecd44765ac3dae437fa144e58f934f01ba73260c1b84e30271cfb1e';
    expect(hashMessage({ personalSign: data })).toEqual(expectHashedMessage);
  });

  it('should hash a raw message [{ personalSign: Uint8Array }]', () => {
    const data: Uint8Array = new TextEncoder().encode('my message');
    const expectHashedMessage =
      '0x615128eb1ecd44765ac3dae437fa144e58f934f01ba73260c1b84e30271cfb1e';
    expect(hashMessage({ personalSign: data })).toEqual(expectHashedMessage);
  });
});
