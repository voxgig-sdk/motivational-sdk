-- Motivational SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Motivational",
      slug = "motivational",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://cdn.jsdelivr.net/gh/GomezMig03/MotivationalAPI",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["language"] = {},
      },
    },
    entity = {
      ["language"] = {
        ["fields"] = {
          {
            ["name"] = "author",
            ["req"] = true,
            ["short"] = "The author of the phrase or source reference",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "phrase",
            ["req"] = true,
            ["short"] = "The motivational phrase text",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "religion",
            ["req"] = true,
            ["short"] = "Indicates if the phrase is religious.",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "language",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "en",
                      ["kind"] = "param",
                      ["name"] = "language",
                      ["orig"] = "language",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{language}.json",
                ["parts"] = {
                  "{language}.json",
                },
                ["select"] = {
                  ["exist"] = {
                    "language",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
