import { ErrorCode, FuelError, toHex, Wallet } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';
import { Sample, SampleFactory } from './sway-programs-api';

/**
 * @group node
 * @group browser
 */
describe('ExampleContract', () => {
  let launched: Awaited<ReturnType<typeof launchTestNode>>;
  let wallet: Wallet;

  beforeAll(async () => {
    launched = await launchTestNode();
    [wallet] = launched.wallets;
  });

  afterAll(async () => {
    await launched.stop();
  });

  async function deployContract() {
    const { contract } = await SampleFactory.deploy(wallet).waitForResult();
    return contract;
  }

  it('should return the input value', async () => {
    const contract = await deployContract();
    const input = 1337;

    const { value } = await contract.functions.return_input(input).call().waitForResult();
    expect(value.toHex()).toEqual(toHex(input));

    const contractInstance = new Sample(contract.id, wallet);
    const { value: v2 } = await contractInstance.functions.return_input(input).call().waitForResult();
    expect(v2.toHex()).toBe(toHex(input));
  });

  it('should work correctly with the deploy method', async () => {
    const contract = await deployContract();
    const input = 1337;

    const { value } = await contract.functions.return_input(input).call().waitForResult();
    expect(value.toHex()).toEqual(toHex(input));
  });

  it('should throw an error when simulating with a wallet without resources', async () => {
    const contract = await deployContract();
    const unfundedWallet = Wallet.generate({ provider: launched.provider });
    const contractInstance = new Sample(contract.id, unfundedWallet);

    await expectToThrowFuelError(
      () => contractInstance.functions.return_input(1337).simulate(),
      new FuelError(ErrorCode.NOT_ENOUGH_FUNDS, 'The account(s) sending the transaction don\'t have enough funds to cover the transaction.')
    );
  });

  it('should not throw an error during dry run with a wallet without resources', async () => {
    const contract = await deployContract();
    const unfundedWallet = Wallet.generate({ provider: launched.provider });
    const contractInstance = new Sample(contract.id, unfundedWallet);

    await expect(contractInstance.functions.return_input(1337).dryRun()).resolves.not.toThrow();
  });

  it('should demonstrate correct usage of generated files', async () => {
    const contract = await deployContract();
    const contractsIds = { sample: contract.id };

    const sampleContract = new Sample(contractsIds.sample, wallet);
    const { value } = await sampleContract.functions.return_input(1337).dryRun();

    expect(value.toHex()).toEqual(toHex(1337));
  });
});
