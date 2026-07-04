# Motivational SDK configuration

module MotivationalConfig
  def self.make_config
    {
      "main" => {
        "name" => "Motivational",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://cdn.jsdelivr.net/gh/GomezMig03/MotivationalAPI",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "language" => {},
        },
      },
      "entity" => {
        "language" => {
          "fields" => [
            {
              "active" => true,
              "name" => "author",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "phrase",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "religion",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 2,
            },
          ],
          "name" => "language",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "en",
                        "kind" => "param",
                        "name" => "language",
                        "orig" => "language",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/{language}.json",
                  "parts" => [
                    "{language}.json",
                  ],
                  "select" => {
                    "exist" => [
                      "language",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    MotivationalFeatures.make_feature(name)
  end
end
