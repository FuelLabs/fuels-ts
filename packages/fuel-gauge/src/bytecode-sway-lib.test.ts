import { FUEL_NETWORK_URL, Predicate, Provider, arrayify } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';
import { defaultPredicateAbi } from '../test/fixtures/abi/predicate';
import { defaultPredicateBytecode } from '../test/fixtures/bytecode/predicate';

import { getSetupContract } from './utils';

/**
 * @group node
 */
// TODO: Unskip test after sway-libs become compatible with latest forc (0.52+)
describe.skip('bytecode computations', () => {
  test('compute_bytecode_root', async () => {
    const { binHexlified: bytecodeFromFile } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.CALL_TEST_CONTRACT
    );

    const setupContract = getSetupContract(FuelGaugeProjectsEnum.BYTECODE_SWAY_LIB);
    const contract = await setupContract();

    const { logs } = await contract.functions
      .compute_bytecode_root(arrayify(bytecodeFromFile))
      .call();

    const bytecodeRoot: string = logs[0];

    expect(bytecodeRoot).toBeDefined();
    expect(bytecodeRoot.length).toBe(66);
  });

  test('verify_contract_bytecode', async () => {
    const { binHexlified: bytecodeFromFile } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.BYTECODE_SWAY_LIB
    );

    const setupContract = getSetupContract(FuelGaugeProjectsEnum.BYTECODE_SWAY_LIB);
    const contract = await setupContract();

    const { value } = await contract.functions
      .verify_contract_bytecode(
        {
          bits: contract.id.toB256(),
        },
        arrayify(bytecodeFromFile)
      )
      .call();

    expect(value).toBeTruthy();
  });

  test('compute_predicate_address', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const predicate = new Predicate({
      bytecode: defaultPredicateBytecode,
      abi: defaultPredicateAbi,
      provider,
    });

    const address = predicate.address;

    const setupContract = getSetupContract(FuelGaugeProjectsEnum.BYTECODE_SWAY_LIB);
    const contract = await setupContract();

    const { value } = await contract.functions
      .compute_predicate_address(arrayify(defaultPredicateBytecode))
      .call();

    expect(value.bits).toEqual(address.toB256());
  });
});
