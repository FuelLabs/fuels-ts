<script setup>
  import { data } from '../../versions.data'
  const { fuels } = data
</script>

# CDN Usage (browser only)

```html-vue
<script type="module">
  import {
    Wallet,
    Provider,
  } from "https://cdnjs.cloudflare.com/ajax/libs/fuels/{{fuels}}/browser.mjs";

  const main = async () => {
    const provider = new Provider(
      "https://mainnet.fuel.network/v1/graphql",
    );
    const { name } = await provider.getChain();
    console.log(name);
  };

  main();
</script>
```

# More

- [React Example](./react-example.md)
