export const enumOfStructsAbi = {
  "abi": {
    "types": [
      {
        "typeId": 0,
        "type": "enum MyEnum",
        "components": [
          {
            "name": "rgb",
            "type": 1,
            "typeArguments": null
          }
        ],
        "typeParameters": null
      },
      {
        "typeId": 1,
        "type": "struct ColorStruct",
        "components": [
          {
            "name": "red",
            "type": 4,
            "typeArguments": null
          },
          {
            "name": "green",
            "type": 2,
            "typeArguments": null
          },
          {
            "name": "blue",
            "type": 3,
            "typeArguments": null
          }
        ],
        "typeParameters": null
      },
      {
        "typeId": 2,
        "type": "u16",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 3,
        "type": "u32",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 4,
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
            "type": 0,
            "typeArguments": null
          }
        ],
        "name": "main",
        "output": {
          "name": "",
          "type": 0,
          "typeArguments": null
        },
        "attributes": null
      }
    ],
    "loggedTypes": [],
    "messagesTypes": [],
    "configurables": []
  }
} as const;