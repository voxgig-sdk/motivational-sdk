package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Motivational",
			"slug": "motivational",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://cdn.jsdelivr.net/gh/GomezMig03/MotivationalAPI",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"language": map[string]any{},
			},
		},
		"entity": map[string]any{
			"language": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "author",
						"req": true,
						"short": "The author of the phrase or source reference",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phrase",
						"req": true,
						"short": "The motivational phrase text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "religion",
						"req": true,
						"short": "Indicates if the phrase is religious.",
						"type": "`$INTEGER`",
					},
				},
				"name": "language",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "en",
											"kind": "param",
											"name": "language",
											"orig": "language",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{language}.json",
								"parts": []any{
									"{language}.json",
								},
								"select": map[string]any{
									"exist": []any{
										"language",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
