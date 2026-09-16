"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('LanguageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MOTIVATIONAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MOTIVATIONAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MotivationalSDK.test();
        const ent = testsdk.Language();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MOTIVATIONAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'language.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "author", "req": true, "short": "The author of the phrase or source reference", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "phrase", "req": true, "short": "The motivational phrase text", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "religion", "req": true, "short": "Indicates if the phrase is religious.", "type": "`$INTEGER`", "index$": 2 }], "name": "language", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "en", "kind": "param", "name": "language", "orig": "language", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /{language}.json", "json": "{\"operationId\":\"getMotivationalPhrases\",\"parameters\":[{\"description\":\"Language code for the motivational phrases\",\"examples\":{\"english\":{\"summary\":\"English phrases\",\"value\":\"en\"},\"french\":{\"summary\":\"French phrases\",\"value\":\"fr\"},\"japanese\":{\"summary\":\"Japanese phrases\",\"value\":\"ja\"},\"spanish\":{\"summary\":\"Spanish phrases\",\"value\":\"es\"}},\"in\":\"path\",\"name\":\"language\",\"required\":true,\"schema\":{\"enum\":[\"en\",\"es\",\"fr\",\"ja\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"phrases\":{\"summary\":\"Example motivational phrases\",\"value\":[{\"author\":\"Robert Frost\",\"phrase\":\"The only way out is through.\",\"religion\":0},{\"author\":\"Philippians 4:13\",\"phrase\":\"I can do all things through Christ who strengthens me.\",\"religion\":1}]}},\"schema\":{\"items\":{\"properties\":{\"author\":{\"description\":\"The author of the phrase or source reference\",\"type\":\"string\"},\"phrase\":{\"description\":\"The motivational phrase text\",\"type\":\"string\"},\"religion\":{\"description\":\"Indicates if the phrase is religious. 1 = catholic, 0 = non-religious\",\"enum\":[0,1],\"type\":\"integer\"}},\"required\":[\"phrase\",\"author\",\"religion\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with array of motivational phrases\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Language file not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{language}.json", "segments": [{ "lit": "{language}.json" }], "select": { "exist": ["language"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "language", "name__orig": "language", "Name": "Language", "name_": "language", "name-": "language", "NAME": "LANGUAGE", "index$": 0 }, { "active": true, "entity": "language", "key$": "BasicLanguageFlow", "kind": "basic", "name": "BasicLanguageFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "language": "language01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "language_ref01" } }], "index$": 0 }] }, 'Language');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let language_ref01_data = Object.values(setup.data.existing.language)[0];
        // LIST
        const language_ref01_ent = client.Language();
        const language_ref01_match = {};
        language_ref01_match['language'] = setup.idmap['language01'];
        const language_ref01_list = (await language_ref01_ent.list(language_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/language/LanguageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MotivationalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['language01', 'language02', 'language03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MOTIVATIONAL_TEST_LANGUAGE_ENTID': idmap,
        'MOTIVATIONAL_TEST_LIVE': 'FALSE',
        'MOTIVATIONAL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MOTIVATIONAL_TEST_LANGUAGE_ENTID'];
    const live = 'TRUE' === env.MOTIVATIONAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MOTIVATIONAL_TEST_LANGUAGE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MotivationalSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=LanguageEntity.test.js.map