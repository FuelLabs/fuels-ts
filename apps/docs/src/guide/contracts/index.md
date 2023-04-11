# Calling contracts

Once you've deployed your contract, as seen in the previous sections, you'll likely want to:

1. Call contract methods;
2. Configure call and transaction parameters such as gas price, byte price, and gas limit;
3. Forward coins and gas in your contract calls;
4. Read and interpret returned values and logs.

Here's an example. Suppose your Sway contract has two ABI methods called `echo_str_8(str[8])` and `echo_u8(u8)`. Once you've deployed the contract, you can call the methods like this:

<<< @/../../snippets/src/guide/contracts/index.test.ts#echo-values{ts:line-numbers}

The example above uses all the default configurations and performs a simple contract call. On the next sections, we'll see how we can further configure the many different parameters in a contract call.
