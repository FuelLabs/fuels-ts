# Predicate With Configurable Constants

Predicates, much like [contracts](../contracts/configurable-constants.md) and [scripts](../scripts/configurable-constants.md), also supports configurable constants. This enables Predicates to suit specific use cases and enhance their functionality.

## Example: Asset Transfer Validation

Let's consider an example where a predicate is used to validate an asset transfer. In this case, the transfer will only be executed if the recipient's address is on a pre-approved whitelist.

The following snippet illustrates how this could be implemented:

<<< @/../../docs/sway/whitelisted-address-predicate/src/main.sw#full{rust:line-numbers}

In this example, you'll notice the use of a configurable constant named `WHITELISTED`. This constant has a default value that represents the default approved address.

## Modifying The Whitelist

If there is a need to whitelist another address, the `WHITELISTED` constant can be easily updated. The following snippet demonstrates how to set a new value for the `WHITELISTED` constant and to make the predicate execute the transfer:

<<< @/../../docs/src/snippets/predicates/configurables/configurable-set-data.ts#full{ts:line-numbers}

By ensuring that the updated `WHITELISTED` address matches the intended recipient's address, the predicate will validate the transfer successfully.

## Default Whitelist Address

In scenarios where the default whitelisted address is already the intended recipient, there's no need to update the `WHITELISTED` constant. The predicate will validate the transfer based on the default value. Here's how this scenario might look:

<<< @/../../docs/src/snippets/predicates/configurables/configurable-default.ts#full{ts:line-numbers}

This ability to configure constants within predicates provides a flexible mechanism for customizing their behavior, thereby enhancing the robustness and versatility of our asset transfer process.

It's important to note that these customizations do not directly modify the original predicate. The address of a predicate is a hash of its bytecode. Any change to the bytecode, including altering a constant value, would generate a different bytecode, and thus a different hash. This leads to the creation of a new predicate with a new address.

This doesn't mean that we're changing the behavior of the original predicate. Instead, we're creating a new predicate with a different configuration.

Therefore, while configurable constants do indeed enhance the flexibility and robustness of predicates, it is achieved by creating new predicates with different configurations, rather than altering the behavior of existing ones.
