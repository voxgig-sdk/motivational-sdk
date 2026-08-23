
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Motivational',
        slug: "motivational",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://cdn.jsdelivr.net/gh/GomezMig03/MotivationalAPI",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      language: {
      },

    }
  }


  entity = {
    "language": {
      "fields": [
        {
          "name": "author",
          "req": true,
          "short": "The author of the phrase or source reference",
          "type": "`$STRING`"
        },
        {
          "name": "phrase",
          "req": true,
          "short": "The motivational phrase text",
          "type": "`$STRING`"
        },
        {
          "name": "religion",
          "req": true,
          "short": "Indicates if the phrase is religious.",
          "type": "`$INTEGER`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{language}.json",
              "parts": [
                "{language}.json"
              ],
              "select": {
                "exist": [
                  "language"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

