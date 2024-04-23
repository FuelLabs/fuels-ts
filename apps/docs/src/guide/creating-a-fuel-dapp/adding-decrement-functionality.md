# Adding Decrement Functionality

In order to introduce decrement functionality to our counter, we will have to do two things: 1. Introduce a `decrement_counter` function to our Sway contract, and 2. Modify the `./src/pages/index.tsx` file to introduce a button that calls this function.

## 1. Modifying the Sway Contract

To add a `decrement_counter` function to our Sway contract, we will modify the `./sway-programs/contract/src/main.sw` file.

There are two steps when adding a new function to a Sway program. The first step is to specify the function's ABI.

Towards the top of the file, you will find the ABI section for the contract. Let's add a new function to it:

<<< @/../../create-fuels-counter-guide/sway-programs/contract/src/main.sw#create-fuels-counter-guide-abi{rust:line-numbers}

The second step is to implement the function.

We will add the implementation of the `decrement_counter` function right below the `increment_counter` function.

<<< @/../../create-fuels-counter-guide/sway-programs/contract/src/main.sw#create-fuels-counter-guide-impl{rust:line-numbers}

## 2. Modifying the Frontend

We will now add a new button to the frontend that will call the `decrement_counter` function when clicked. To do this, we will modify the `./src/pages/index.tsx` file.

First, we will add a function called `onDecrementPressed` similar to the `onIncrementPressed` function:

<<< @/../../create-fuels-counter-guide/src/pages/index.tsx#create-fuels-counter-guide-on-decrement-react-function{ts:line-numbers}

Secondly, we will add a new button to the UI that will call the `onDecrementPressed` function when clicked:

<!-- TODO: our docs engine currently does not detect comments in JSX -->

```tsx
<Button onClick={onDecrementPressed} className="mt-6">
  Decrement Counter
</Button>
```

Congratulations! That's all. You should now be able to see the counter dApp running at `http://localhost:3000` with our newly added decrement functionality.

You can find the complete source code of the dApp we built [here](https://github.com/FuelLabs/fuels-ts/tree/master/apps/create-fuels-counter-guide).

![End result of this guide](/creating-a-fuel-dapp-create-fuels-end-result.png)

Whenever you want to add a new feature to your dApp and quickly prototype things, you can follow the same steps we followed in this guide.
