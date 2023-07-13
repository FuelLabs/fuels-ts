# Messages

A message is an object that contains some data that when broadcasted to the network, can change the state of the blockchain. This can include sending tokens, creating a new account, or deploying a smart contract. Messages are signed by a sender and broadcasted to the network. This message is then verified and included in a block.

This is the general structure of a `Message` object:

<<< @/../../../packages/providers/src/message.ts#Message-shape{ts:line-numbers}
