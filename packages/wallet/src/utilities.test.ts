import { signMessage, verifyMessage, verifyTransaction } from './utilities';

describe('Verify and signMessage', () => {
  const key = '0xae78c8b502571dba876742437f8bc78b689cf8518356c0921393d89caaf284ce';
  const message = 'this is a random message';
  it('matches publickey of the signer for a given message', () => {
    const signedMessage = signMessage(key, message);
    const address = verifyMessage(message, signedMessage);

    expect(address).toEqual('0xbafe4b5d65c9efd34390402ca185d4a58a9e5b1d89c5bc52d90d382059296508');
  });

  it('matches publickey of the signer for a given signed transaction', async () => {
    // TODO: create mocked transaction data values to test agains it
    const signedTransaction =
      '0xf8adb86800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001ca0a451a2703834e5a65b7d08309f8d19952f6a1f01304a461e3cd4702f6dbb79a4a073d3f80ef8103e1fd31876442b7ec4b639f0093e19acdcccd1787e1e969bc7bc';
    const verifiedAddress = verifyTransaction(signedTransaction);

    expect(verifiedAddress).toEqual(
      '0xbafe4b5d65c9efd34390402ca185d4a58a9e5b1d89c5bc52d90d382059296508'
    );
  });
});
