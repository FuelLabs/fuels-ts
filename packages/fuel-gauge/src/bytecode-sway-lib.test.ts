import { arrayify, Predicate } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { PredicateTrueAbi__factory } from '../test/typegen';
import { BytecodeSwayLibAbi__factory } from '../test/typegen/contracts';
import BytecodeSwayLibAbiHex from '../test/typegen/contracts/BytecodeSwayLibAbi.hex';

import { launchTestContract } from './utils';

/**
 * @group node
 * @group browser
 */
describe('bytecode computations', () => {
  it('compute_bytecode_root', async () => {
    using contract = await launchTestContract({
      deployer: BytecodeSwayLibAbi__factory,
      bytecode: BytecodeSwayLibAbiHex,
    });

    const { waitForResult } = await contract.functions
      .compute_bytecode_root(Array.from(arrayify(BytecodeSwayLibAbiHex)))
      .call();

    const { logs } = await waitForResult();

    const bytecodeRoot: string = logs[0];

    expect(bytecodeRoot).toBeDefined();
    expect(bytecodeRoot.length).toBe(66);
  });

  it('verify_contract_bytecode', async () => {
    using contract = await launchTestContract({
      deployer: BytecodeSwayLibAbi__factory,
      bytecode: BytecodeSwayLibAbiHex,
    });

    const { waitForResult } = await contract.functions
      .verify_contract_bytecode(
        {
          bits: contract.id.toB256(),
        },
        Array.from(arrayify(BytecodeSwayLibAbiHex))
      )
      .call();

    const { value } = await waitForResult();

    expect(value).toBeTruthy();
  });

  /**
   * TODO: At first glance, this test doesn't do much.
   * The `compute_predicate_address` function just returns a constant address
   * which matches the predicate's address.
   * As it is currently, it does no "smart" predicate address computation with the passed-in vector
   * and its usefuleness is questionable.
   */
  it('compute_predicate_address', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: BytecodeSwayLibAbi__factory,
          bytecode: BytecodeSwayLibAbiHex,
        },
      ],
    });
    const defaultPredicateBytecode =
      '0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8';

    const {
      contracts: [contract],
      provider,
    } = launched;

    const predicate = new Predicate({
      provider,
      bytecode: defaultPredicateBytecode,
      abi: PredicateTrueAbi__factory.abi,
    });

    const address = predicate.address;

    const { waitForResult } = await contract.functions
      .compute_predicate_address(Array.from(arrayify(defaultPredicateBytecode)))
      .call();

    const { value } = await waitForResult();

    expect(value.bits).toEqual(address.toB256());
  });
});
