import { launchTestNode } from 'fuels/test-utils';
import { MockConnector } from '../test/fixtures/connectors/mock-connector';
import { Fuel, Account, bn } from 'fuels';
import { CallTestContract, CallTestContractFactory } from '../test/typegen';
import { MockPredicateSignerConnector } from '../test/fixtures/connectors/mock-predicate-signer-connector';

describe('Connectors', () => {
  it('transaction w/ connector [transfer]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [connectorWallet, receiverWallet],
    } = launched;
    const connector = new MockConnector({
      wallets: [connectorWallet],
    });
    const fuel = await new Fuel({
      connectors: [connector],
    });

    const transferAmount = 1000;
    const connectedAccount = new Account(connectorWallet.address, provider, fuel);

    const initialBalance = await receiverWallet.getBalance();
    await connectedAccount.transfer(receiverWallet.address, transferAmount);
    const finalBalance = await receiverWallet.getBalance();
    expect(finalBalance).toStrictEqual(initialBalance.add(transferAmount));
  });

  it('transaction w/ connector [contract]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CallTestContractFactory,
        },
      ],
    });
    const {
      provider,
      wallets: [connectorWallet],
      contracts: [contract],
    } = launched;
    const connector = new MockConnector({
      wallets: [connectorWallet],
    });
    const fuel = await new Fuel({
      connectors: [connector],
    }).init();

    const connectorAccount = new Account(connectorWallet.address, provider, fuel);
    const contractInstance = new CallTestContract(contract.id, connectorAccount);

    const tx = await contractInstance.functions.no_params().call();
    const { value } = await tx.waitForResult();
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(bn(50)));
  });

  it('transaction w/ connector [deploy]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [connectorWallet],
    } = launched;
    const connector = new MockConnector({
      wallets: [connectorWallet],
    });
    const fuel = await new Fuel({
      connectors: [connector],
    }).init();

    const connectorAccount = new Account(connectorWallet.address, provider, fuel);
    const contractFactory = new CallTestContractFactory(connectorAccount);
    const createTx = await contractFactory.deploy();
    const createResult = await createTx.waitForResult();
    expect(createResult.transactionResult.isStatusSuccess).toBe(true);

    const { contract } = createResult;
    const tx = await contract.functions.no_params().call();
    const { value } = await tx.waitForResult();
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(bn(50)));
  });

  it('transaction w/ predicate connector [transfer]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [connectorWallet, receiverWallet],
    } = launched;
    const connector = new MockPredicateSignerConnector({
      wallets: [connectorWallet],
    });
    const fuel = await new Fuel({
      connectors: [connector],
    }).init();

    const fundingAmount = bn(100_000);
    const transferAmount = bn(1000);

    // Fund associated predicate account
    const predicateAccountAddress = connector.getPredicateAddress(
      provider,
      connectorWallet.address.toString()
    );
    const predicateAccount = new Account(predicateAccountAddress, provider);
    const fundTx = await receiverWallet.transfer(predicateAccountAddress, fundingAmount);
    const fundResult = await fundTx.waitForResult();
    expect(fundResult.isStatusSuccess).toBe(true);
    expect(await predicateAccount.getBalance()).toStrictEqual(fundingAmount);

    // Transfer from connector account to receiver wallet
    const connectorAccount = new Account(connectorWallet.address, provider, fuel);
    const initialBalance = await receiverWallet.getBalance();
    const transferTx = await connectorAccount.transfer(receiverWallet.address, transferAmount);
    const transferResult = await transferTx.waitForResult();
    expect(transferResult.isStatusSuccess).toBe(true);

    const finalBalance = await receiverWallet.getBalance();
    const predicateBalance = await predicateAccount.getBalance();
    expect(finalBalance).toStrictEqual(initialBalance.add(transferAmount));
    expect(JSON.stringify(predicateBalance)).toStrictEqual(
      JSON.stringify(fundingAmount.sub(transferAmount).sub(transferResult.fee))
    );
  });

  it('transaction w/ predicate connector [contract]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CallTestContractFactory,
        },
      ],
    });
    const {
      provider,
      wallets: [connectorWallet],
      contracts: [contract],
    } = launched;
    const connector = new MockPredicateSignerConnector({
      wallets: [connectorWallet],
    });
    const fuel = await new Fuel({
      connectors: [connector],
    }).init();

    // Fund associated predicate account
    const fundingAmount = bn(100_000);
    const predicateAccountAddress = connector.getPredicateAddress(
      provider,
      connectorWallet.address.toString()
    );
    const predicateAccount = new Account(predicateAccountAddress, provider);
    const fundTx = await connectorWallet.transfer(predicateAccountAddress, fundingAmount);
    const fundResult = await fundTx.waitForResult();
    expect(fundResult.isStatusSuccess).toBe(true);
    expect(await predicateAccount.getBalance()).toStrictEqual(fundingAmount);

    const connectorAccount = new Account(connectorWallet.address, provider, fuel);
    const contractInstance = new CallTestContract(contract.id, connectorAccount);

    const tx = await contractInstance.functions.no_params().call();
    const result = await tx.waitForResult();
    expect(JSON.stringify(result.value)).toStrictEqual(JSON.stringify(bn(50)));

    const summary = await result.transactionResponse.getTransactionSummary();
    const predicateBalance = await predicateAccount.getBalance();
    expect(JSON.stringify(predicateBalance)).toStrictEqual(
      JSON.stringify(fundingAmount.sub(summary.fee))
    );
  });

  it('transaction w/ predicate connector [deploy]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [connectorWallet],
    } = launched;
    const connector = new MockPredicateSignerConnector({
      wallets: [connectorWallet],
    });
    const fuel = await new Fuel({
      connectors: [connector],
    }).init();

    // Fund associated predicate account
    const fundingAmount = bn(100_000);
    const predicateAccountAddress = connector.getPredicateAddress(
      provider,
      connectorWallet.address.toString()
    );
    const predicateAccount = new Account(predicateAccountAddress, provider);
    const fundTx = await connectorWallet.transfer(predicateAccountAddress, fundingAmount);
    const fundResult = await fundTx.waitForResult();
    expect(fundResult.isStatusSuccess).toBe(true);
    expect(await predicateAccount.getBalance()).toStrictEqual(fundingAmount);

    const connectorAccount = new Account(connectorWallet.address, provider, fuel);
    const contractFactory = new CallTestContractFactory(connectorAccount);
    const createTx = await contractFactory.deploy();
    const createResult = await createTx.waitForResult();
    expect(createResult.transactionResult.isStatusSuccess).toBe(true);

    const { contract } = createResult;
    const tx = await contract.functions.no_params().call();
    const { value } = await tx.waitForResult();
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(bn(50)));
  });
});
