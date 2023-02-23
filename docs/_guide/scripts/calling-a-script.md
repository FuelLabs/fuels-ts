[nav_order: 2]

# Calling a script

Suppose your Sway script `main` function is written using the arguments passed to the `main` function like so:

[@code:rust](./packages/fuel-gauge/test-projects/script-main-args/src/main.sw#typedoc:script-with-main-args)

You can still hand code out a solution wrapper using `callScript` utility to call your script with data. However, if you prefer to use the ABI generated from your script, you can use the `ScriptFactory` helper:

[@code:typescript](./packages/fuel-gauge/src/script-main-args.test.ts#typedoc:script-call-factory)
