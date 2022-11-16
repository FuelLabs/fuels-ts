# The FuelVM binary file

The command `forc build` compiles your Sway code and generates the bytecode: the binary code that the Fuel Virtual Machine will interpret. For instance, the smart contract below:

```Rust
contract;

abi MyContract {
    fn test_function() -> bool;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
}
```

After `forc build`, will have a binary file that contains:

```terminal
$ cat out/debug/my-test.bin
G4]�]D`I]C�As@
           6]C�$@!QK%
```

This seems very unreadable! But, `forc` has a nice interpreter for this bytecode: `forc `parse-bytecode`, which will interpret that binary data and output the equivalent FuelVM assembly:

```terminal
$ forc parse-bytecode out/debug/my-test.bin
half-word   byte   op                raw           notes
        0   0      JI(4)             90 00 00 04   jump to byte 16
        1   4      NOOP              47 00 00 00
        2   8      Undefined         00 00 00 00   data section offset lo (0)
        3   12     Undefined         00 00 00 34   data section offset hi (52)
        4   16     LW(63, 12, 1)     5d fc c0 01
        5   20     ADD(63, 63, 12)   10 ff f3 00
        6   24     LW(17, 6, 73)     5d 44 60 49
        7   28     LW(16, 63, 1)     5d 43 f0 01
        8   32     EQ(16, 17, 16)    13 41 14 00
        9   36     JNZI(16, 11)      73 40 00 0b   conditionally jump to byte 44
       10   40     RVRT(0)           36 00 00 00
       11   44     LW(16, 63, 0)     5d 43 f0 00
       12   48     RET(16)           24 40 00 00
       13   52     Undefined         00 00 00 00
       14   56     Undefined         00 00 00 01
       15   60     Undefined         00 00 00 00
       16   64     XOR(20, 27, 53)   21 51 bd 4b
```

If you want to deploy your smart contract using the SDK, this binary file is important; it's what we'll be sending to the FuelVM in a transaction.
