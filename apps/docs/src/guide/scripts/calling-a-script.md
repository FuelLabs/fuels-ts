# Calling a script

Suppose your Sway script `main` function is written using the arguments passed to the `main` function like so:

<<< @/../../../packages/fuel-gauge/test/fixtures/forc-projects/script-main-args/src/main.sw#script-with-main-args{rust:line-numbers}

You can still hand code out a solution wrapper using `callScript` utility to call your script with data. However, if you prefer to use the ABI generated from your script, you can use the `ScriptFactory` helper:

<<< @/../../../packages/fuel-gauge/src/script-main-args.test.ts#script-call-factory{ts:line-numbers}
