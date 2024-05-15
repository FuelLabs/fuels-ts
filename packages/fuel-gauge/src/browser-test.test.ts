import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { Account, Contract } from 'fuels';
import { FUEL_NETWORK_URL, Provider } from 'fuels';

import type { CoverageContractAbi } from '../test/fixtures/typegen/contracts';
import { CoverageContractAbi__factory } from '../test/fixtures/typegen/contracts';
import bytecode from '../test/fixtures/typegen/contracts/CoverageContractAbi.hex';

/**
 * @group browser
 */
describe('Browser Test', () => {
  let provider: Provider;
  let wallet: Account;
  let contract: Contract<CoverageContractAbi>;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    wallet = await generateTestWallet(provider);
    contract = await CoverageContractAbi__factory.deployContract(bytecode, wallet);
  });

  it('calls contract', async () => {
    const { value } = await contract.functions.echo_bool(true).call();
    expect(value).toBe(true);
  });
});
