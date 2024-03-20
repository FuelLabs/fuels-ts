<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const url = `
    https://docs.fuel.network/docs/sway/introduction/
  `
</script>

# Instantiating a script

Similar to contracts and predicates, once you've written a script in Sway and compiled it with `forc build` (read <a :href="url" target="_blank" rel="noreferrer">here</a> for more on how to work with Sway), you'll get the script binary. Using the binary, you can instantiate a `script` as shown in the code snippet below:

<<< @/../../../packages/script/src/script.test.ts#script-init{ts:line-numbers}

In the [next section](./calling-a-script.md), we show how to call a script.
