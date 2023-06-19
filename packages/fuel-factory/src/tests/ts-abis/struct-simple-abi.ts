export const structSimpleAbi = {
  "abi": {
    "types": [
      {
        "typeId": 0,
        "type": "generic T",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 1,
        "type": "generic U",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 2,
        "type": "struct StructA",
        "components": [
          {
            "name": "propA1",
            "type": 0,
            "typeArguments": null
          },
          {
            "name": "propA2",
            "type": 1,
            "typeArguments": null
          }
        ],
        "typeParameters": [
          0,
          1
        ]
      },
      {
        "typeId": 3,
        "type": "struct StructB",
        "components": [
          {
            "name": "propB1",
            "type": 0,
            "typeArguments": null
          }
        ],
        "typeParameters": [
          0
        ]
      },
      {
        "typeId": 4,
        "type": "struct StructC",
        "components": [
          {
            "name": "propC1",
            "type": 2,
            "typeArguments": [
              {
                "name": "",
                "type": 3,
                "typeArguments": [
                  {
                    "name": "",
                    "type": 6,
                    "typeArguments": null
                  }
                ]
              },
              {
                "name": "",
                "type": 5,
                "typeArguments": null
              }
            ]
          }
        ],
        "typeParameters": null
      },
      {
        "typeId": 5,
        "type": "u16",
        "components": null,
        "typeParameters": null
      },
      {
        "typeId": 6,
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
            "type": 4,
            "typeArguments": null
          }
        ],
        "name": "main",
        "output": {
          "name": "",
          "type": 6,
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