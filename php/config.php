<?php
declare(strict_types=1);

// Motivational SDK configuration

class MotivationalConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Motivational",
                "slug" => "motivational",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://cdn.jsdelivr.net/gh/GomezMig03/MotivationalAPI",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "language" => [],
                ],
            ],
            "entity" => [
        'language' => [
          'fields' => [
            [
              'name' => 'author',
              'req' => true,
              'short' => 'The author of the phrase or source reference',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phrase',
              'req' => true,
              'short' => 'The motivational phrase text',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'religion',
              'req' => true,
              'short' => 'Indicates if the phrase is religious.',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'language',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'en',
                        'kind' => 'param',
                        'name' => 'language',
                        'orig' => 'language',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{language}.json',
                  'parts' => [
                    '{language}.json',
                  ],
                  'select' => [
                    'exist' => [
                      'language',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return MotivationalFeatures::make_feature($name);
    }
}
