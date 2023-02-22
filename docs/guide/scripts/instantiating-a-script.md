[nav_order: 1]

# Instantiating a script

Similar to contracts and predicates, once you've written a script in Sway and compiled it with `forc build` (read [here](https://fuellabs.github.io/sway/v{{site.data.versions.sway}}/book/introduction/index.html) for more on how to work with Sway), you'll get the script binary. Using the binary, you can instantiate a `script` as shown in the code snippet below:

[@code:typescript](./packages/script/src/script.test.ts#typedoc:script-init)

In the [next section](./calling-a-script.md), we show how to call a script.
