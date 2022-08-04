---
layout: default
title: Getting Started
nav_order: 0
---

# Introduction

In this tutorial we are going to;

- Install `forc` and the `fuel-core` locally
- Spin up a local Fuel Network
- Write & Deploy a Sway Contract
- Create a Fuel DApp to interact with your Contract

# Requirements

- [Node.js v16.15.0 or latest stable](https://nodejs.org/en/). We recommend using [nvm](https://github.com/nvm-sh/nvm) to install.

# Install `forc` and the `fuel-core` locally

## Description

`Forc` is similar to "npm", or "cargo" but for [`Sway`](https://fuellabs.github.io/sway). `Forc` stands for Fuel Orchestrator. Forc provides a variety of tools and commands for developers working with the Fuel ecosystem, such as scaffolding a new project, formatting, running scripts, deploying contracts, testing contracts, and more. If you're coming from a Rust background, `forc` is similar to cargo.
[read more about Forc](https://fuellabs.github.io/sway/v0.19.1/forc/index.html)

`Fuel Core` is the implementation of the `Fuel VM`. `Fuel Core` provides the ability to spin-up a `Fuel Client` locally with custom chain configs. The `Fuel Core` is also used on the live chains, but we are not going to cover it here, as we wan't to focus on development only.
[See more](https://github.com/FuelLabs/fuel-core)

## Installing

### MacOS and Linux

When using `MacOS` and `Linux`. We provide a tools [`fuelup`](https://github.com/FuelLabs/fuelup) that works as toolchain manager for Fuel.

#### 1. To install `fuelup`;

```sh
curl --proto '=https' --tlsv1.2 -sSf https://fuellabs.github.io/fuelup/fuelup-init.sh | sh
```

#### 2. Install `forc & fuel-core`

```sh
fuelup toolchain install latest
```

### From Source Code

When using `Windows` or installing from source code we also require you to install all cargo toolchain.
[See more instructions here](https://fuellabs.github.io/sway/v0.19.1/introduction/installation.html#installing-from-source).

### Checking environment

To check it `forc` and `fuel-core` are correct installed let's run a version command;

```sh
forc --version
```

```sh
fuel-core --version
```

Both should return the respective versions.

###
