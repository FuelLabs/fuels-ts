<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const url = `https://docs.fuel.network/docs/forc/commands/forc_test/`
</script>

# Testing

This guide will teach you how to test Sway applications using the Typescript SDK.

While we use [Vitest](https://vitest.dev/) internally, we don't enforce any specific testing library or framework, so you can pick whichever you feel comfortable with.

### Not using Typescript?

See also:

1. Using [`forc test`](https://docs.fuel.network/docs/forc/commands/forc%5ftest/#forc-test)
1. Using [the Rust SDK](https://docs.fuel.network/docs/fuels-rs/testing/)
