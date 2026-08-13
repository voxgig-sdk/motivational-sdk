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
            "active": True,
            "name": "author",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "phrase",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "religion",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 2,
          },
        ],
        "name": "language",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "en",
                      "kind": "param",
                      "name": "language",
                      "orig": "language",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
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
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
