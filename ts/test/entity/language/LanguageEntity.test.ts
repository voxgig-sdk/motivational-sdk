

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MotivationalSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('LanguageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MOTIVATIONAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('MOTIVATIONAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MotivationalSDK.test()
    const ent = testsdk.Language()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MOTIVATIONAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'language.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"author":{"a":true,"h":"Author","n":"author","r":true,"sh":"The author of the phrase or source reference","t":"`$STRING`","key$":"author","index$":0},"phrase":{"a":true,"h":"Phrase","n":"phrase","r":true,"sh":"The motivational phrase text","t":"`$STRING`","key$":"phrase","index$":1},"religion":{"a":true,"h":"Religion","n":"religion","r":true,"sh":"Indicates if the phrase is religious.","t":"`$INTEGER`","key$":"religion","index$":2}},"name":"language","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /{language}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"en","k":"param","n":"language","or":"language","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{language}.json","q":{"exist":["language"]},"r":{},"s":[{"lit":"{language}.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"language","name__orig":"language","Name":"Language","name_":"language","name-":"language","NAME":"LANGUAGE","index$":0}, {"active":true,"entity":"language","key$":"BasicLanguageFlow","kind":"basic","name":"BasicLanguageFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"language":"language01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"language_ref01"}}],"index$":0}]}, 'Language', {"GET /{language}.json":{"protocol":"http","operationId":"getMotivationalPhrases","responses":{"200":{"description":"Successful response with array of motivational phrases","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"phrase":{"type":"string","description":"The motivational phrase text","key$":"phrase"},"author":{"type":"string","description":"The author of the phrase or source reference","key$":"author"},"religion":{"type":"integer","description":"Indicates if the phrase is religious. 1 = catholic, 0 = non-religious","enum":[0,1],"key$":"religion"}},"required":["phrase","author","religion"],"x-ref":"#/components/schemas/MotivationalPhrase","index$":0}},"examples":{"phrases":{"summary":"Example motivational phrases","value":[{"phrase":"The only way out is through.","author":"Robert Frost","religion":0},{"phrase":"I can do all things through Christ who strengthens me.","author":"Philippians 4:13","religion":1}]}}}}},"404":{"description":"Language file not found","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string","description":"Error message"},"code":{"type":"integer","description":"Error code"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Server error","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string","description":"Error message"},"code":{"type":"integer","description":"Error code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"language","in":"path","description":"Language code for the motivational phrases","required":true,"schema":{"type":"string","enum":["en","es","fr","ja"]},"examples":{"english":{"value":"en","summary":"English phrases"},"spanish":{"value":"es","summary":"Spanish phrases"},"french":{"value":"fr","summary":"French phrases"},"japanese":{"value":"ja","summary":"Japanese phrases"}},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let language_ref01_data = Object.values(setup.data.existing.language)[0] as any

    // LIST
    const language_ref01_ent = client.Language()
    const language_ref01_match: any = {}
    language_ref01_match['language'] = setup.idmap['language01']

    const language_ref01_list = (await language_ref01_ent.list(language_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/language/LanguageTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MotivationalSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['language01','language02','language03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MOTIVATIONAL_TEST_LANGUAGE_ENTID': idmap,
    'MOTIVATIONAL_TEST_LIVE': 'FALSE',
    'MOTIVATIONAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MOTIVATIONAL_TEST_LANGUAGE_ENTID']

  const live = 'TRUE' === env.MOTIVATIONAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MOTIVATIONAL_TEST_LANGUAGE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MotivationalSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MOTIVATIONAL_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
