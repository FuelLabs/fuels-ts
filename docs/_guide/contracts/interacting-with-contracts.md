[nav_order: 1]

# Interacting with contracts

If you already have a deployed contract and want to call its methods using the SDK, but without deploying it again, all you need is the contract ID of your deployed contract. You can skip the whole deployment setup and just start using it:

[@code:typescript](./packages/fuel-gauge/src/storage-test-contract.test.ts#typedoc:contract-with-id)

The above example assumes that your contract id string is encoded in the bech32m format. You can recognize it by the human-readable-part "fuel" followed by the separator "1". However, when using other Fuel tools, you might end up with a hex-encoded contract id string. A [Contract ID](../types/contract-id.md) can easily be converted to and from other Address formats, see the [conversion guide](../types/conversion.md) for more information.

```typescript
const contract: Contract = new Contract(new Address(ADDRESS_BECH32), abiJSON);

const contract: Contract = new Contract(Address.fromPublicKey(KEY), abiJSON);

const contract: Contract = new Contract(Address.fromB256(hexedB256), abiJSON);
```

You can learn more about the Fuel SDK bech32 type [here](../types/bech32.md).
