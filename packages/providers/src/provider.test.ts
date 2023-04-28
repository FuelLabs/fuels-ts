import { arrayify } from '@ethersproject/bytes';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { randomBytes } from '@fuel-ts/keystore';
import { bn } from '@fuel-ts/math';
import type { Receipt } from '@fuel-ts/transactions';
import { ReceiptType, TransactionType } from '@fuel-ts/transactions';
import * as GraphQL from 'graphql-request';

import Provider from './provider';
import { fromTai64ToUnix, fromUnixToTai64 } from './utils';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Provider', () => {
  it('can getVersion()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const version = await provider.getVersion();

    expect(version).toEqual('0.17.3');
  });

  it('can call()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const callResult = await provider.call({
      type: TransactionType.Script,
      gasPrice: 0,
      gasLimit: 1000000,
      script:
        /*
          Opcode::ADDI(0x10, REG_ZERO, 0xCA)
          Opcode::ADDI(0x11, REG_ZERO, 0xBA)
          Opcode::LOG(0x10, 0x11, REG_ZERO, REG_ZERO)
          Opcode::RET(REG_ONE)
        */
        arrayify('0x504000ca504400ba3341100024040000'),
      scriptData: randomBytes(32),
    });

    const expectedReceipts: Receipt[] = [
      {
        type: ReceiptType.Log,
        id: ZeroBytes32,
        val0: bn(202),
        val1: bn(186),
        val2: bn(0),
        val3: bn(0),
        pc: bn(0x2870),
        is: bn(0x2868),
      },
      {
        type: ReceiptType.Return,
        id: ZeroBytes32,
        val: bn(1),
        pc: bn(0x2874),
        is: bn(0x2868),
      },
      {
        type: ReceiptType.ScriptResult,
        result: bn(0),
        gasUsed: bn(0x67),
      },
    ];

    expect(JSON.stringify(callResult.receipts)).toEqual(JSON.stringify(expectedReceipts));
  });

  // TODO: Add tests to provider sendTransaction
  // sendTransaction can't be tested without a valid signature
  // importing and testing it here can generate cycle dependency
  // as we test this in other modules like call contract its ok to
  // skip for now
  it.skip('can sendTransaction()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const response = await provider.sendTransaction({
      type: TransactionType.Script,
      gasPrice: 0,
      gasLimit: 1000000,
      script:
        /*
          Opcode::ADDI(0x10, REG_ZERO, 0xCA)
          Opcode::ADDI(0x11, REG_ZERO, 0xBA)
          Opcode::LOG(0x10, 0x11, REG_ZERO, REG_ZERO)
          Opcode::RET(REG_ONE)
        */
        arrayify('0x504000ca504400ba3341100024040000'),
      scriptData: randomBytes(32),
    });

    const result = await response.wait();

    expect(result.receipts).toEqual([
      {
        type: ReceiptType.Log,
        id: ZeroBytes32,
        val0: bn(202),
        val1: bn(186),
        val2: bn(0),
        val3: bn(0),
        pc: bn(0x2878),
        is: bn(0x2870),
      },
      {
        type: ReceiptType.Return,
        id: ZeroBytes32,
        val: bn(1),
        pc: bn(0x287c),
        is: bn(0x2870),
      },
      {
        type: ReceiptType.ScriptResult,
        result: bn(0),
        gasUsed: bn(0x2c),
      },
    ]);
  });

  it('can manage session', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const { startSession: id } = await provider.operations.startSession();

    const { reset: resetSuccess } = await provider.operations.reset({ sessionId: id });
    expect(resetSuccess).toEqual(true);

    const { endSession: endSessionSuccess } = await provider.operations.endSession({
      sessionId: id,
    });
    expect(endSessionSuccess).toEqual(true);
  });

  it('can get all chain info', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const { consensusParameters } = await provider.getChain();

    expect(consensusParameters.contractMaxSize).toBeDefined();
    expect(consensusParameters.maxInputs).toBeDefined();
    expect(consensusParameters.maxOutputs).toBeDefined();
    expect(consensusParameters.maxWitnesses).toBeDefined();
    expect(consensusParameters.maxGasPerTx).toBeDefined();
    expect(consensusParameters.maxScriptLength).toBeDefined();
    expect(consensusParameters.maxScriptDataLength).toBeDefined();
    expect(consensusParameters.maxStorageSlots).toBeDefined();
    expect(consensusParameters.maxPredicateLength).toBeDefined();
    expect(consensusParameters.maxPredicateDataLength).toBeDefined();
    expect(consensusParameters.gasPriceFactor).toBeDefined();
    expect(consensusParameters.gasPerByte).toBeDefined();
    expect(consensusParameters.maxMessageDataLength).toBeDefined();
  });

  it('can get node info including minGasPrice', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const { minGasPrice } = await provider.getNodeInfo();

    expect(minGasPrice).toBeDefined();
  });

  it('can change the provider url of the current instance', () => {
    const providerUrl1 = 'http://127.0.0.1:4000/graphql';
    const providerUrl2 = 'http://127.0.0.1:8080/graphql';
    const provider = new Provider(providerUrl1);
    const spyGraphQLClient = jest.spyOn(GraphQL, 'GraphQLClient');

    expect(provider.url).toBe(providerUrl1);
    provider.connect(providerUrl2);
    expect(provider.url).toBe(providerUrl2);
    expect(spyGraphQLClient).toBeCalledWith(providerUrl2, undefined);
  });

  it('can accept a custom fetch function', async () => {
    const providerUrl = 'http://127.0.0.1:4000/graphql';

    const customFetch = async (
      url: string,
      options: {
        body: string;
        headers: { [key: string]: string };
        [key: string]: unknown;
      }
    ) => {
      const graphqlRequest = JSON.parse(options.body);
      const { operationName } = graphqlRequest;
      if (operationName === 'getVersion') {
        const responseText = JSON.stringify({
          data: { nodeInfo: { nodeVersion: '0.30.0' } },
        });
        const response = Promise.resolve(new Response(responseText, options));

        return response;
      }
      return fetch(url, options);
    };

    const provider = new Provider(providerUrl, { fetch: customFetch });
    expect(await provider.getVersion()).toEqual('0.30.0');
  });

  it('can force-produce blocks', async () => {
    // #region Provider-produce-blocks
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const block = await provider.getBlock('latest');
    if (!block) {
      throw new Error('No latest block');
    }
    const { height: latestBlockNumberBeforeProduce } = block;

    const amountOfBlocksToProduce = 3;
    const latestBlockNumber = await provider.produceBlocks(amountOfBlocksToProduce);

    expect(latestBlockNumber.toHex()).toEqual(
      latestBlockNumberBeforeProduce.add(amountOfBlocksToProduce).toHex()
    );
    // #endregion Provider-produce-blocks
  });

  it('can force-produce blocks with custom timestamps', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const block = await provider.getBlock('latest');
    if (!block) {
      throw new Error('No latest block');
    }
    const { time: latestBlockTimestampBeforeProduce, height: latestBlockNumberBeforeProduce } =
      block;
    const latestBlockUnixTimestampBeforeProduce = fromTai64ToUnix(
      latestBlockTimestampBeforeProduce
    );

    const amountOfBlocksToProduce = 3;
    const blockTimeInterval = 100; // 100ms
    const startTimeUnix = new Date(latestBlockUnixTimestampBeforeProduce).getTime() + 1000;
    const startTime = fromUnixToTai64(startTimeUnix); // 1s after the latest block

    const latestBlockNumber = await provider.produceBlocks(amountOfBlocksToProduce, {
      blockTimeInterval: blockTimeInterval.toString(),
      startTime,
    });

    // Verify that the latest block number is the expected one
    expect(latestBlockNumber.toString(10)).toEqual(
      latestBlockNumberBeforeProduce.add(amountOfBlocksToProduce).toString(10)
    );

    // Verify that the produced blocks have the expected timestamps and block numbers
    const producedBlocks = (
      await Promise.all(
        Array.from({ length: amountOfBlocksToProduce }, (_, i) =>
          provider.getBlock(latestBlockNumberBeforeProduce.add(i + 1).toNumber())
        )
      )
    ).map((producedBlock) => ({
      height: producedBlock?.height.toString(10),
      time: producedBlock?.time,
    }));
    const expectedBlocks = Array.from({ length: amountOfBlocksToProduce }, (_, i) => ({
      height: latestBlockNumberBeforeProduce.add(i + 1).toString(10),
      time: fromUnixToTai64(startTimeUnix + i * blockTimeInterval),
    }));
    expect(producedBlocks).toEqual(expectedBlocks);
  });

  it('can getBlocks', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    // Force-producing some blocks to make sure that 10 blocks exist
    await provider.produceBlocks(10);
    // #region Provider-get-blocks
    const blocks = await provider.getBlocks({
      last: 10,
    });
    // #endregion Provider-get-blocks
    expect(blocks.length).toBe(10);
  });
});
