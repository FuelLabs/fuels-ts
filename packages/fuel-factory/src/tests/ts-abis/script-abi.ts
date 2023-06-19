export const scriptAbi = {
  "abi": {
    "types": [
      {
        "typeId": 0,
        "type": "bool",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 1,
        "type": "struct Score",
        "components": [
          {
            "name": "user",
            "type": 2,
            "typeArguments": null
          },
          {
            "name": "points",
            "type": 2,
            "typeArguments": null
          }
        ],
        "typeParameters": null
      },
      {
        "typeId": 2,
        "type": "u8",
        "components": null,
        "typeParameters": null
      }
    ],
    "functions": [
      {
        "inputs": [
          {
            "name": "score",
            "type": 1,
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
  },
  "bin": "0x900000044700000000000000000000245dfcc00110fff3006140000c2404000047000000"
} as const;