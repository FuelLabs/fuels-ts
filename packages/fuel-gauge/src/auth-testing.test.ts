import type { Contract } from 'fuels';

import { getSetupContract, getWallet } from './utils';

const setupContract = getSetupContract('auth_testing_contract');

let contractInstance: Contract;

describe.skip('Auth Testing', () => {
  beforeAll(async () => {
    contractInstance = await setupContract();
  });

  it('can get is_caller_external', async () => {
    const { value } = await contractInstance.functions.is_caller_external().call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id]', async () => {
    const wallet = getWallet();

    const { value } = await contractInstance.functions
      .check_msg_sender({ value: wallet.address.toB256() })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id, using get]', async () => {
    const wallet = getWallet();

    expect(async () => {
      await contractInstance.functions.check_msg_sender({ value: wallet.address.toB256() }).get();
    }).toThrow();
  });

  it('can check_msg_sender [with incorrect id]', async () => {
    const wallet = getWallet();

    expect(async () => {
      await contractInstance.functions
        .check_msg_sender({ value: wallet.address.toB256().replace('x', 'y') })
        .call();
    }).toThrow();
  });
});
