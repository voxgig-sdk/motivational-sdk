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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "author": { "a": true, "h": "Author", "n": "author", "r": true, "sh": "The author of the phrase or source reference", "t": "`$STRING`", "key$": "author", "index$": 0 }, "phrase": { "a": true, "h": "Phrase", "n": "phrase", "r": true, "sh": "The motivational phrase text", "t": "`$STRING`", "key$": "phrase", "index$": 1 }, "religion": { "a": true, "h": "Religion", "n": "religion", "r": true, "sh": "Indicates if the phrase is religious.", "t": "`$INTEGER`", "key$": "religion", "index$": 2 } }, "name": "language", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /{language}.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "en", "k": "param", "n": "language", "or": "language", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/{language}.json", "q": { "exist": ["language"] }, "r": {}, "s": [{ "lit": "{language}.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "language", "name__orig": "language", "Name": "Language", "name_": "language", "name-": "language", "NAME": "LANGUAGE", "index$": 0 }, { "active": true, "entity": "language", "key$": "BasicLanguageFlow", "kind": "basic", "name": "BasicLanguageFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "language": "language01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "language_ref01" } }], "index$": 0 }] }, 'Language', { "GET /{language}.json": { "protocol": "http", "operationId": "getMotivationalPhrases", "responses": { "200": { "description": "Successful response with array of motivational phrases", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "phrase": { "type": "string", "description": "The motivational phrase text", "key$": "phrase" }, "author": { "type": "string", "description": "The author of the phrase or source reference", "key$": "author" }, "religion": { "type": "integer", "description": "Indicates if the phrase is religious. 1 = catholic, 0 = non-religious", "enum": [0, 1], "key$": "religion" } }, "required": ["phrase", "author", "religion"], "x-ref": "#/components/schemas/MotivationalPhrase", "index$": 0 } }, "examples": { "phrases": { "summary": "Example motivational phrases", "value": [{ "phrase": "The only way out is through.", "author": "Robert Frost", "religion": 0 }, { "phrase": "I can do all things through Christ who strengthens me.", "author": "Philippians 4:13", "religion": 1 }] } } } } }, "404": { "description": "Language file not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "message": { "type": "string", "description": "Error message" }, "code": { "type": "integer", "description": "Error code" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "message": { "type": "string", "description": "Error message" }, "code": { "type": "integer", "description": "Error code" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "language", "in": "path", "description": "Language code for the motivational phrases", "required": true, "schema": { "type": "string", "enum": ["en", "es", "fr", "ja"] }, "examples": { "english": { "value": "en", "summary": "English phrases" }, "spanish": { "value": "es", "summary": "Spanish phrases" }, "french": { "value": "fr", "summary": "French phrases" }, "japanese": { "value": "ja", "summary": "Japanese phrases" } }, "index$": 0 }], "securitySource": "unspecified" } });
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