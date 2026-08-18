# Motivational SDK configuration

module MotivationalConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
              "name" => "author",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "phrase",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "religion",
              "req" => true,
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "language",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "en",
                        "kind" => "param",
                        "name" => "language",
                        "orig" => "language",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
