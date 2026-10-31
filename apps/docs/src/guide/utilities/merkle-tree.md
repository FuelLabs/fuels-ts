# Merkle Tree

A Merkle tree is a hash-based data structure that allows efficient verification of data integrity. Each leaf node contains a hash of a data block, and each non-leaf node contains a hash of its children. This makes it possible to prove that a specific piece of data is part of a set without revealing the entire set.

The `@fuel-ts/merkle` package provides utilities for working with binary Merkle trees.

## Creating a Merkle Tree

You can construct a full Merkle tree from an array of hex-encoded data, or compute just the root hash:

<<< @./snippets/merkle/index.ts#create-tree{ts:line-numbers}

For multiple leaves, you can hash your data first and then build the tree:

<<< @./snippets/merkle/index.ts#multi-leaf{ts:line-numbers}

## Generating Proofs

A Merkle proof is the set of sibling hashes needed to reconstruct the path from a leaf to the root. This is useful for proving membership in a set:

<<< @./snippets/merkle/index.ts#get-proof{ts:line-numbers}

## Hashing Leaves

The `hashLeaf` function applies the Merkle leaf-prefix (`0x00`) before hashing, which prevents second-preimage attacks:

<<< @./snippets/merkle/index.ts#hash-leaf{ts:line-numbers}

## Full Example

<<< @./snippets/merkle/index.ts#full{ts:line-numbers}
