import { FUEL_NETWORK_URL, Predicate, Provider, arrayify } from 'fuels';

import { defaultPredicateAbi } from '../test/fixtures/abi/predicate';
import { defaultPredicateBytecode } from '../test/fixtures/bytecode/predicate';
import { BytecodeSwayLibAbi__factory } from '../test/typegen/contracts';
import BytecodeSwayLibAbiHex from '../test/typegen/contracts/BytecodeSwayLibAbi.hex';
import CallTestContractAbiHex from '../test/typegen/contracts/CallTestContractAbi.hex';

import { launchTestContract } from './utils';

/**
 * @group node
 * @group browser
 */
describe('bytecode computations', () => {
  test('compute_bytecode_root', async () => {
    using contract = await launchTestContract({
      deployer: BytecodeSwayLibAbi__factory,
      bytecode: BytecodeSwayLibAbiHex,
    });

    const { logs } = await contract.functions
      .compute_bytecode_root(Array.from(arrayify(CallTestContractAbiHex)))
      .call();

    const bytecodeRoot: string = logs[0];

    expect(bytecodeRoot).toBeDefined();
    expect(bytecodeRoot.length).toBe(66);
  });

  test('verify_contract_bytecode', async () => {
    using contract = await launchTestContract({
      deployer: BytecodeSwayLibAbi__factory,
      bytecode: BytecodeSwayLibAbiHex,
    });

    const { value } = await contract.functions
      .verify_contract_bytecode(
        {
          bits: contract.id.toB256(),
        },
        Array.from(arrayify(BytecodeSwayLibAbiHex))
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

    const contract = await launchTestContract({
      deployer: BytecodeSwayLibAbi__factory,
      bytecode: BytecodeSwayLibAbiHex,
    });

    const { value } = await contract.functions
      .compute_predicate_address(Array.from(arrayify(defaultPredicateBytecode)))
      .call();

    expect(value.bits).toEqual(address.toB256());
  });
});
