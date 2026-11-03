# Language entity test

require "minitest/autorun"
require "json"
require_relative "../Motivational_sdk"
require_relative "runner"

class LanguageEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = MotivationalSDK.test(nil, nil)
    ent = testsdk.Language(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = MotivationalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = MotivationalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Language(nil).list({ "language" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = language_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "language." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      { "language01" => "en" }.each do |_live_key, _live_ex|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          setup[:idmap][_live_key] = _live_ex
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    language_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.language")))
    language_ref01_data = nil
    if language_ref01_data_raw.length > 0
      language_ref01_data = Helpers.to_map(language_ref01_data_raw[0][1])
    end

    # LIST
    language_ref01_ent = client.Language(nil)
    language_ref01_match = {
      "language" => setup[:idmap]["language01"],
    }

    language_ref01_list_result = language_ref01_ent.list(language_ref01_match, nil)
    assert language_ref01_list_result.is_a?(Array)

  end
end

def language_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "language", "LanguageTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MotivationalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["language01", "language02", "language03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["MOTIVATIONAL_TEST_LANGUAGE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "MOTIVATIONAL_TEST_LANGUAGE_ENTID" => idmap,
    "MOTIVATIONAL_TEST_LIVE" => "FALSE",
    "MOTIVATIONAL_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["MOTIVATIONAL_TEST_LANGUAGE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["MOTIVATIONAL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = MotivationalSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["MOTIVATIONAL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["MOTIVATIONAL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
