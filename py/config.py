# Motivational SDK configuration


def make_config():
    return {
        "main": {
            "name": "Motivational",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://cdn.jsdelivr.net/gh/GomezMig03/MotivationalAPI",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "language": {},
            },
        },
        "entity": {
      "language": {
        "fields": [
          {
            "name": "author",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "phrase",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "religion",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "language",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "en",
                      "kind": "param",
                      "name": "language",
                      "orig": "language",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/{language}.json",
                "parts": [
                  "{language}.json",
                ],
                "select": {
                  "exist": [
                    "language",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
