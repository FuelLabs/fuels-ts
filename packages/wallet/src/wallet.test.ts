import { verifyMessage } from './utilities';
import Wallet from './wallet';

describe('Wallet', () => {
  const key = '0xae78c8b502571dba876742437f8bc78b689cf8518356c0921393d89caaf284ce';
  const message = 'this is a random message';
  it('signs a message', async () => {
    const wallet = new Wallet(key);
    const verifiedAddress = verifyMessage(message, await wallet.signMessage(message));

    expect(verifiedAddress).toEqual(wallet.address);
  });
});
