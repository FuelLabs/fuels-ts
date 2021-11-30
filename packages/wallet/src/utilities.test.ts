import { signMessage, verifyMessage } from './utilities';

describe('Verify and signMessage', () => {
  const key = '0xae78c8b502571dba876742437f8bc78b689cf8518356c0921393d89caaf284ce';
  const message = 'this is a random message';
  it('matches publickey of the signer for a given message', () => {
    const signedMessage = signMessage(key, message);
    const address = verifyMessage(message, signedMessage);

    expect(address).toEqual('0xbafe4b5d65c9efd34390402ca185d4a58a9e5b1d89c5bc52d90d382059296508');
  });
});
