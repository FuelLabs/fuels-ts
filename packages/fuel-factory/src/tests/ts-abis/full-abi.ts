export const fullAbi = {
  "abi": {
    "types": [
      {
        "typeId": 0,
        "type": "()",
        "components": [],
        "typeParameters": null
      },
      {
        "typeId": 1,
        "type": "(_, _, _)",
        "components": [
          {
            "name": "__tuple_element",
            "type": 19,
            "typeArguments": null
          },
          {
            "name": "__tuple_element",
            "type": 19,
            "typeArguments": null
          },
          {
            "name": "__tuple_element",
            "type": 19,
            "typeArguments": null
          }
        ],
        "typeParameters": null
      },
      {
        "typeId": 2,
        "type": "[_; 3]",
        "components": [
          {
            "name": "__array_element",
            "type": 19,
            "typeArguments": null
          }
        ],
        "typeParameters": null
      },
      {
        "typeId": 3,
        "type": "[_; 5]",
        "components": [
          {
            "name": "__array_element",
            "type": 7,
            "typeArguments": [
              {
                "name": "",
                "type": 19,
                "typeArguments": null
              }
            ]
          }
        ],
        "typeParameters": null
      },
      {
        "typeId": 4,
        "type": "b256",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 5,
        "type": "bool",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 6,
        "type": "enum MyEnum",
        "components": [
          {
            "name": "Checked",
            "type": 0,
            "typeArguments": null
          },
          {
            "name": "Pending",
            "type": 0,
            "typeArguments": null
          }
        ],
        "typeParameters": null
      },
      {
        "typeId": 7,
        "type": "enum Option",
        "components": [
          {
            "name": "None",
            "type": 0,
            "typeArguments": null
          },
          {
            "name": "Some",
            "type": 8,
            "typeArguments": null
          }
        ],
        "typeParameters": [
          8
        ]
      },
      {
        "typeId": 8,
        "type": "generic T",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 9,
        "type": "raw untyped ptr",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 10,
        "type": "str[5]",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 11,
        "type": "struct EvmAddress",
        "components": [
          {
            "name": "value",
            "type": 4,
            "typeArguments": null
          }
        ],
        "typeParameters": null
      },
      {
        "typeId": 12,
        "type": "struct MyStruct",
        "components": [
          {
            "name": "x",
            "type": 19,
            "typeArguments": null
          },
          {
            "name": "y",
            "type": 19,
            "typeArguments": null
          },
          {
            "name": "state",
            "type": 6,
            "typeArguments": null
          }
        ],
        "typeParameters": null
      },
      {
        "typeId": 13,
        "type": "struct RawVec",
        "components": [
          {
            "name": "ptr",
            "type": 9,
            "typeArguments": null
          },
          {
            "name": "cap",
            "type": 18,
            "typeArguments": null
          }
        ],
        "typeParameters": [
          8
        ]
      },
      {
        "typeId": 14,
        "type": "struct StructWithMultiOption",
        "components": [
          {
            "name": "multiple",
            "type": 3,
            "typeArguments": null
          }
        ],
        "typeParameters": null
      },
      {
        "typeId": 15,
        "type": "struct Vec",
        "components": [
          {
            "name": "buf",
            "type": 13,
            "typeArguments": [
              {
                "name": "",
                "type": 8,
                "typeArguments": null
              }
            ]
          },
          {
            "name": "len",
            "type": 18,
            "typeArguments": null
          }
        ],
        "typeParameters": [
          8
        ]
      },
      {
        "typeId": 16,
        "type": "u16",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 17,
        "type": "u32",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 18,
        "type": "u64",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 19,
        "type": "u8",
        "components": null,
        "typeParameters": null
      }
    ],
    "functions": [
      {
        "inputs": [
          {
            "name": "x",
            "type": 2,
            "typeArguments": null
          }
        ],
        "name": "types_array",
        "output": {
          "name": "",
          "type": 2,
          "typeArguments": null
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 4,
            "typeArguments": null
          }
        ],
        "name": "types_b256",
        "output": {
          "name": "",
          "type": 4,
          "typeArguments": null
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 5,
            "typeArguments": null
          }
        ],
        "name": "types_bool",
        "output": {
          "name": "",
          "type": 5,
          "typeArguments": null
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 6,
            "typeArguments": null
          }
        ],
        "name": "types_enum",
        "output": {
          "name": "",
          "type": 6,
          "typeArguments": null
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 11,
            "typeArguments": null
          }
        ],
        "name": "types_evm_address",
        "output": {
          "name": "",
          "type": 11,
          "typeArguments": null
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 7,
            "typeArguments": [
              {
                "name": "",
                "type": 19,
                "typeArguments": null
              }
            ]
          }
        ],
        "name": "types_option",
        "output": {
          "name": "",
          "type": 7,
          "typeArguments": [
            {
              "name": "",
              "type": 19,
              "typeArguments": null
            }
          ]
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 7,
            "typeArguments": [
              {
                "name": "",
                "type": 12,
                "typeArguments": null
              }
            ]
          }
        ],
        "name": "types_option_geo",
        "output": {
          "name": "",
          "type": 7,
          "typeArguments": [
            {
              "name": "",
              "type": 12,
              "typeArguments": null
            }
          ]
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 10,
            "typeArguments": null
          }
        ],
        "name": "types_str",
        "output": {
          "name": "",
          "type": 10,
          "typeArguments": null
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 12,
            "typeArguments": null
          }
        ],
        "name": "types_struct",
        "output": {
          "name": "",
          "type": 12,
          "typeArguments": null
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 1,
            "typeArguments": null
          }
        ],
        "name": "types_tuple",
        "output": {
          "name": "",
          "type": 1,
          "typeArguments": null
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 16,
            "typeArguments": null
          }
        ],
        "name": "types_u16",
        "output": {
          "name": "",
          "type": 16,
          "typeArguments": null
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 17,
            "typeArguments": null
          }
        ],
        "name": "types_u32",
        "output": {
          "name": "",
          "type": 17,
          "typeArguments": null
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 18,
            "typeArguments": null
          }
        ],
        "name": "types_u64",
        "output": {
          "name": "",
          "type": 18,
          "typeArguments": null
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 19,
            "typeArguments": null
          }
        ],
        "name": "types_u8",
        "output": {
          "name": "",
          "type": 19,
          "typeArguments": null
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 15,
            "typeArguments": [
              {
                "name": "",
                "type": 12,
                "typeArguments": null
              }
            ]
          }
        ],
        "name": "types_vector_geo",
        "output": {
          "name": "",
          "type": 15,
          "typeArguments": [
            {
              "name": "",
              "type": 12,
              "typeArguments": null
            }
          ]
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 15,
            "typeArguments": [
              {
                "name": "",
                "type": 14,
                "typeArguments": null
              }
            ]
          }
        ],
        "name": "types_vector_option",
        "output": {
          "name": "",
          "type": 15,
          "typeArguments": [
            {
              "name": "",
              "type": 14,
              "typeArguments": null
            }
          ]
        },
        "attributes": null
      },
      {
        "inputs": [
          {
            "name": "x",
            "type": 15,
            "typeArguments": [
              {
                "name": "",
                "type": 19,
                "typeArguments": null
              }
            ]
          }
        ],
        "name": "types_vector_u8",
        "output": {
          "name": "",
          "type": 15,
          "typeArguments": [
            {
              "name": "",
              "type": 19,
              "typeArguments": null
            }
          ]
        },
        "attributes": null
      }
    ],
    "loggedTypes": [],
    "messagesTypes": [],
    "configurables": []
  }
} as const;