# Fuel ASM

Instruction set for the [FuelVM](https://github.com/FuelLabs/fuel-specs).

---

This is a wrapped WASM version of the [`fuel-asm`](https://crates.io/crates/fuel-asm) Rust crate:

- https://crates.io/crates/fuel-asm
- https://github.com/FuelLabs/fuel-vm/tree/master/fuel-asm

## Usage

This example demonstrates how to use the `FuelAsm` to create a program, represented as a vector of instructions, and then convert it to bytes.

<<< @./snippets/fuel-asm.ts#main{ts:line-numbers}

## Reference

The above usage is the `Typescript` equivalent of the [original example](https://crates.io/crates/fuel-asm) in `Rust`.

<<< @../../../../fuel-asm-example/src/main.rs#main{rs:line-numbers}

## See Also

- [FuelVM Specs](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/)
- [FuelVM Semantics](https://docs.fuel.network/docs/specs/fuel-vm/#semantics)
- [Inline Assembly in Sway](https://docs.fuel.network/docs/sway/advanced/assembly)
