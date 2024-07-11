import { Predicate, arrayify } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { defaultPredicateAbi } from '../test/fixtures/abi/predicate';
import { defaultPredicateBytecode } from '../test/fixtures/bytecode/predicate';
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

  it('compute_predicate_address', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: BytecodeSwayLibAbi__factory,
          bytecode: BytecodeSwayLibAbiHex,
        },
      ],
    });

    const {
      contracts: [contract],
      provider,
    } = launched;

    const predicate = new Predicate({
      bytecode: defaultPredicateBytecode,
      abi: defaultPredicateAbi,
      provider,
    });

    const address = predicate.address;

    const { waitForResult } = await contract.functions
      .compute_predicate_address(Array.from(arrayify(defaultPredicateBytecode)))
      .call();

    const { value } = await waitForResult();

    expect(value.bits).toEqual(address.toB256());
  });
});
