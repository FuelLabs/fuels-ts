<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const url = `
    https://fuellabs.github.io/sway/v${forc}/book/sway-program-types/scripts.html#scripts-and-the-sdks
  `
</script>

# Scripts

A script, in Sway, is runnable bytecode on the chain which executes once to perform some task. A script can return a single value of any type.

Learn more about scripts <a :href="url" target="_blank" rel="noreferrer">here</a>.
