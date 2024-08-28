import { arrayify } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { PredicateTrue } from '../test/typegen';
import { BytecodeSwayLibFactory } from '../test/typegen/contracts';

import { launchTestContract } from './utils';

/**
 * @group node
 * @group browser
 */
describe('bytecode computations', () => {
  it('compute_bytecode_root', async () => {
    using contract = await launchTestContract({
      factory: BytecodeSwayLibFactory,
    });

    const { waitForResult } = await contract.functions
      .compute_bytecode_root(Array.from(arrayify(BytecodeSwayLibFactory.bytecode)))
      .call();

    const { logs } = await waitForResult();

    const bytecodeRoot: string = logs[0];

    expect(bytecodeRoot).toBeDefined();
    expect(bytecodeRoot.length).toBe(66);
  });

  it('verify_contract_bytecode', async () => {
    using contract = await launchTestContract({
      factory: BytecodeSwayLibFactory,
    });

    const { waitForResult } = await contract.functions
      .verify_contract_bytecode(
        {
          bits: contract.id.toB256(),
        },
        Array.from(arrayify(BytecodeSwayLibFactory.bytecode))
      )
      .call();

    const { value } = await waitForResult();

    expect(value).toBeTruthy();
  });

  it('compute_predicate_address', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [{ factory: BytecodeSwayLibFactory }],
    });

    const {
      contracts: [contract],
      provider,
    } = launched;

    const predicate = new PredicateTrue({ provider });

    const address = predicate.address;

    const { waitForResult } = await contract.functions
      .compute_predicate_address(Array.from(arrayify(PredicateTrue.bytecode)))
      .call();

    const { value } = await waitForResult();

    expect(value.bits).toEqual(address.toB256());
  });
});
