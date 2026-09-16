

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"author","req":true,"short":"The author of the phrase or source reference","type":"`$STRING`","index$":0},{"active":true,"name":"phrase","req":true,"short":"The motivational phrase text","type":"`$STRING`","index$":1},{"active":true,"name":"religion","req":true,"short":"Indicates if the phrase is religious.","type":"`$INTEGER`","index$":2}],"name":"language","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"example":"en","kind":"param","name":"language","orig":"language","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /{language}.json","json":"{\"operationId\":\"getMotivationalPhrases\",\"parameters\":[{\"description\":\"Language code for the motivational phrases\",\"examples\":{\"english\":{\"summary\":\"English phrases\",\"value\":\"en\"},\"french\":{\"summary\":\"French phrases\",\"value\":\"fr\"},\"japanese\":{\"summary\":\"Japanese phrases\",\"value\":\"ja\"},\"spanish\":{\"summary\":\"Spanish phrases\",\"value\":\"es\"}},\"in\":\"path\",\"name\":\"language\",\"required\":true,\"schema\":{\"enum\":[\"en\",\"es\",\"fr\",\"ja\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"phrases\":{\"summary\":\"Example motivational phrases\",\"value\":[{\"author\":\"Robert Frost\",\"phrase\":\"The only way out is through.\",\"religion\":0},{\"author\":\"Philippians 4:13\",\"phrase\":\"I can do all things through Christ who strengthens me.\",\"religion\":1}]}},\"schema\":{\"items\":{\"properties\":{\"author\":{\"description\":\"The author of the phrase or source reference\",\"type\":\"string\"},\"phrase\":{\"description\":\"The motivational phrase text\",\"type\":\"string\"},\"religion\":{\"description\":\"Indicates if the phrase is religious. 1 = catholic, 0 = non-religious\",\"enum\":[0,1],\"type\":\"integer\"}},\"required\":[\"phrase\",\"author\",\"religion\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with array of motivational phrases\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Language file not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{language}.json","segments":[{"lit":"{language}.json"}],"select":{"exist":["language"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"language","name__orig":"language","Name":"Language","name_":"language","name-":"language","NAME":"LANGUAGE","index$":0}, {"active":true,"entity":"language","key$":"BasicLanguageFlow","kind":"basic","name":"BasicLanguageFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"language":"language01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"language_ref01"}}],"index$":0}]}, 'Language')
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
  
