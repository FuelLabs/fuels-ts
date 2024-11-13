# Contracts

In the Fuel Network, contracts play a crucial role in facilitating interactions between users and the decentralized applications built on top of the network. Once you've deployed a contract, you may want to perform various tasks such as:

1. Calling contract methods;
2. Configuring call and transaction parameters like gas price, byte price, and gas limit;
3. Forwarding coins and gas in your contract calls;
4. Reading and interpreting returned values and logs.

For instance, consider a Sway contract with two ABI methods called `echo_str_8(str[8])` and `echo_u8(u8)`. After deploying the contract, you can call the methods as follows:

<<< @/../../docs/src/snippets/contracts/introduction.ts#method-calls{ts:line-numbers}

The example above demonstrates a simple contract call using default configurations. The following sections will explore how to further configure various parameters for contract calls, allowing for more advanced interactions with your deployed contracts in the Fuel Network.
