# CDN Usage (browser only)

```html
<script type="module">
  import {
    Wallet,
    Provider,
  } from "https://cdnjs.cloudflare.com/ajax/libs/fuels/{{fuels}}/browser.mjs";

  const main = async () => {
    const provider = await Provider.create(
      "https://mainnet.fuel.network/v1/graphql",
    );
    const { name } = provider.getChain();
    console.log(name);
  };

  main();
</script>
```

# More

- [React Example](./react-example.md)
