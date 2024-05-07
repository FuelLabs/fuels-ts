import { Address } from '@fuel-ts/address';
import { randomBytes } from '@fuel-ts/crypto';
import { hexlify } from '@fuel-ts/utils';

import { TestMessage } from './test-message';

/**
 * @group node
 */
describe('test-message', () => {
  test('has default values', () => {
    const message = new TestMessage().toChainMessage();

    expect(message.amount).toBeDefined();
    expect(message.da_height).toBeDefined();
    expect(message.data).toBeDefined();
    expect(message.nonce).toBeDefined();
    expect(message.recipient).toBeDefined();
    expect(message.sender).toBeDefined();
  });

  test('accepts custom values', () => {
    const recipient = Address.fromRandom();
    const sender = Address.fromRandom();
    const amount = 1;
    const daHeight = 1;
    const data = '1234';
    const nonce = hexlify(randomBytes(32));

    const testMessage = new TestMessage({
      amount,
      recipient,
      sender,
      nonce,
      da_height: daHeight,
      data,
    });

    const message = testMessage.toChainMessage();
    expect(message.amount).toEqual(amount);
    expect(message.da_height).toEqual(daHeight);
    expect(message.data).toEqual(data);
    expect(message.nonce).toEqual(nonce);
    expect(message.recipient).toEqual(recipient.toB256());
    expect(message.sender).toEqual(sender.toB256());
  });
});
