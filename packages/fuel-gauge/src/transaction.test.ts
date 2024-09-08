import {
  type BytesLike,
  type WalletUnlocked,
  decompressBytecode,
  hexlify,
  InputMessageCoder,
  randomBytes,
  sleep,
  TransactionType,
  UpgradeTransactionRequest,
  Wallet,
  UploadTransactionRequest,
} from 'fuels';
import { launchTestNode, TestMessage } from 'fuels/test-utils';

import { CallTestContractFactory } from '../test/typegen';

import { subsectionFromBytecode } from './utils';

/**
 * @group node
 * @group browser
 */
describe('Transaction', () => {
  it('should ensure a mint transaction can be decoded just fine', async () => {
    using launched = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1ms'],
        loggingEnabled: false,
      },
    });
    const { provider } = launched;

    const {
      transactions: [tx],
    } = await provider.getTransactions({ first: 1 });

    expect(tx.type).toBe(TransactionType.Mint);
  });

  it('should spent message with data just fine (W/ AMOUNT)', async () => {
    const messageAmount = 100_000;
    const initialBalance = 50_000;

    const testMessage = new TestMessage({
      data: hexlify(InputMessageCoder.encodeData('0x09')),
      amount: messageAmount,
    });

    using launched = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1ms'],
      },
      contractsConfigs: [
        {
          factory: CallTestContractFactory,
        },
      ],
      walletsConfig: {
        count: 1,
        amountPerCoin: initialBalance,
        messages: [testMessage],
      },
    });

    const {
      provider,
      contracts: [contract],
      wallets: [fundedWallet],
    } = launched;

    const baseAssetId = provider.getBaseAssetId();

    const {
      messages: [message],
    } = await fundedWallet.getMessages();

    const request = await contract.functions.foo(10).getTransactionRequest();
    request.addMessageInput(message);

    const cost = await fundedWallet.getTransactionCost(request);

    request.gasLimit = cost.gasUsed;
    request.maxFee = cost.maxFee;

    await fundedWallet.fund(request, cost);

    const tx = await fundedWallet.sendTransaction(request);

    const { isStatusSuccess } = await tx.waitForResult();

    // Wait for message status to update
    await sleep(1000);

    const finalBalance = await fundedWallet.getBalance(baseAssetId);
    const status = await provider.getMessageStatus(message.nonce.toString());

    expect(finalBalance.toNumber()).toBeGreaterThan(messageAmount);
    expect(status.state).toBe('SPENT');
    expect(isStatusSuccess).toBeTruthy();
  });

  it('should spent message with data just fine (W/O AMOUNT)', async () => {
    const messageAmount = 0;

    const testMessage = new TestMessage({
      data: hexlify(InputMessageCoder.encodeData('0x09')),
      amount: messageAmount,
    });

    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CallTestContractFactory,
        },
      ],
      walletsConfig: {
        count: 1,
        amountPerCoin: 200_000,
        messages: [testMessage],
      },
    });

    const {
      provider,
      contracts: [contract],
      wallets: [fundedWallet],
    } = launched;

    const {
      messages: [message],
    } = await fundedWallet.getMessages();

    const request = await contract.functions.foo(10).getTransactionRequest();
    request.addMessageInput(message);

    const cost = await fundedWallet.getTransactionCost(request);

    request.gasLimit = cost.gasUsed;
    request.maxFee = cost.maxFee;

    await fundedWallet.fund(request, cost);

    const tx = await fundedWallet.sendTransaction(request);

    const { isStatusSuccess } = await tx.waitForResult();

    // Wait for message status to update
    await sleep(1000);

    const status = await provider.getMessageStatus(message.nonce.toString());

    expect(isStatusSuccess).toBeTruthy();
    expect(status.state).toBe('SPENT');
  });
});

/**
 * @group node
 * @group browser
 */
describe('Transaction upgrade chain', () => {
  const baseAssetId = '9ce8b60e43e46980b77dce432a16cfd8b15c8fbf186a1f9ed9c64b5b1e414d46';
  const privateKey = '0x7f20345c5de541c26cc418364768bdca18c77dfbf6d651308470c20ec5c69a79';

  const setupTestNode = async () => {
    const privileged = Wallet.fromPrivateKey(privateKey);

    const consensusParameters = {
      V1: {
        privileged_address: privileged.address.toB256(),
        base_asset_id: baseAssetId,
      },
    };
    const coin = {
      owner: privileged.address.toB256(),
      amount: 1000000000,
      asset_id: baseAssetId,
      tx_id: hexlify(randomBytes(32)),
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
    };
    const snapshotConfig = {
      chainConfig: { consensus_parameters: consensusParameters },
      stateConfig: { coins: [coin] },
    };

    const { provider, wallets, cleanup } = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1ms'],
        loggingEnabled: false,
        snapshotConfig,
      },
    });
    privileged.provider = provider;

    return { provider, privileged, wallets, cleanup, [Symbol.dispose]: cleanup };
  };

  const upgradeConsensusParameters = async (wallet: WalletUnlocked, bytecode: BytesLike) => {
    const request = new UpgradeTransactionRequest();
    request.addConsensusParametersUpgradePurpose(bytecode);

    const cost = await wallet.getTransactionCost(request);
    request.maxFee = cost.maxFee;
    await wallet.fund(request, cost);

    const response = await wallet.sendTransaction(request);
    return response.waitForResult();
  };

  it('should correctly update the privileged address in consensus data', async () => {
    // Consensus parameters with other privileged address
    const CONSENSUS_BYTECODE = decompressBytecode(
      'H4sIAAAAAAAAA2Ng+M8Igg2Hrus3NAg0MDE0LGCDIqAQlMcAlHrAyxBjz8DMQAvASFUEwj9+bNOwrV+6rWirwekd/mdO+/+44/BDPO9LiO9tecmgtewgz035fyZ4x6QMr3O/Xp9YfGXp1KcaK86n+b22+5wvoLChYS4vAOSrKjscAQAA'
    );

    using launched = await setupTestNode();
    const { privileged } = launched;

    // Upgrade the privileged address
    const { isStatusSuccess, isTypeUpgrade } = await upgradeConsensusParameters(
      privileged,
      CONSENSUS_BYTECODE
    );
    expect(isStatusSuccess).toBeTruthy();
    expect(isTypeUpgrade).toBeTruthy();

    // Attempts to update again but the privileged address has been changed
    await expect(() =>
      upgradeConsensusParameters(privileged, CONSENSUS_BYTECODE)
    ).rejects.toThrowError(/Validity\(TransactionUpgradeNoPrivilegedAddress\)/);
  });

  it('should correctly update the gas costs in consensus data', async () => {
    // Consensus parameters bytecode with gas costs free
    const CONSENSUS_BYTECODE = decompressBytecode(
      'H4sIAAAAAAAAA2Ng+M8Igg3ty/kaGgQamBgaFrBBEVAIymMASj3gZXhwjtWegZmBFoCRqgiE57zYxuf8JLNhe+05Zy2x8zc2xvTvl8iSn3fzmHe0nKOvG8h7Qbt2f1V/ZP/1yU4lfhHFKe81Hpe6mz+Q1a/42P4g02KvOQDW/Lz1HgEAAA=='
    );

    using launched = await setupTestNode();
    const { privileged, provider } = launched;

    const {
      chain: { consensusParameters: consensusBeforeUpgrade },
    } = await provider.fetchChainAndNodeInfo();

    // Update the gas costs to free
    const { isStatusSuccess, isTypeUpgrade } = await upgradeConsensusParameters(
      privileged,
      CONSENSUS_BYTECODE
    );
    expect(isStatusSuccess).toBeTruthy();
    expect(isTypeUpgrade).toBeTruthy();

    // Fetch the upgraded gas costs, they should be different from before
    const {
      chain: { consensusParameters: consensusAfterUpgrade },
    } = await provider.fetchChainAndNodeInfo();

    expect(consensusBeforeUpgrade.gasCosts).not.toEqual(consensusAfterUpgrade.gasCosts);
  });

  it('should load bytecode in subsections slowly', { timeout: 30000 }, async () => {
    using launched = await setupTestNode();
    const { privileged, provider } = launched;

    const { subsections, merkleRoot } = subsectionFromBytecode();
    const requests = subsections.map((subsection) => {
      const request = UploadTransactionRequest.from({});
      request.addSubsection({
        proofSet: subsection.proofSet,
        subsection: subsection.subsection,
        root: subsection.root,
        subsectionsNumber: subsection.subsectionsNumber,
        subsectionIndex: subsection.subsectionIndex,
      });
      return request;
    });

    // Upload the subsections
    for (const request of requests) {
      const cost = await privileged.getTransactionCost(request);
      request.maxFee = cost.maxFee;
      await privileged.fund(request, cost);
      const response = await privileged.sendTransaction(request);
      const { isTypeUpload, isStatusSuccess } = await response.waitForResult();
      expect(isTypeUpload).toBeTruthy();
      expect(isStatusSuccess).toBeTruthy();
    }

    // Upgrade the chain with the root
    const request = new UpgradeTransactionRequest();
    request.addStateTransitionUpgradePurpose(merkleRoot);

    const cost = await privileged.getTransactionCost(request);
    request.maxFee = cost.maxFee;
    await privileged.fund(request, cost);

    const response = await privileged.sendTransaction(request);
    const { isTypeUpgrade, isStatusSuccess, blockId } = await response.waitForResult();
    expect(isTypeUpgrade).toBeTruthy();
    expect(isStatusSuccess).toBeTruthy();

    // Check the bytecode version has changed
    const block = await provider.getBlock(blockId as string);
    await provider.produceBlocks(1);
    const nextBlock = await provider.getBlock('latest');

    const versionBeforeUpgrade = block?.header.stateTransitionBytecodeVersion;
    const versionAfterUpgrade = nextBlock?.header.stateTransitionBytecodeVersion;

    expect(versionBeforeUpgrade).not.toEqual(versionAfterUpgrade);
  });
});
