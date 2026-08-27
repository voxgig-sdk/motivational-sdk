# Motivational SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Motivational",
            "slug": "motivational",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "The author of the phrase or source reference",
            "type": "`$STRING`",
          },
          {
            "name": "phrase",
            "req": True,
            "short": "The motivational phrase text",
            "type": "`$STRING`",
          },
          {
            "name": "religion",
            "req": True,
            "short": "Indicates if the phrase is religious.",
            "type": "`$INTEGER`",
          },
        ],
        "name": "language",
        "op": {
          "list": {
            "input": "data",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
