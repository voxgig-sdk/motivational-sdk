# Motivational SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MotivationalUtility.registrar = ->(u) {
  u.clean = MotivationalUtilities::Clean
  u.done = MotivationalUtilities::Done
  u.make_error = MotivationalUtilities::MakeError
  u.feature_add = MotivationalUtilities::FeatureAdd
  u.feature_hook = MotivationalUtilities::FeatureHook
  u.feature_init = MotivationalUtilities::FeatureInit
  u.fetcher = MotivationalUtilities::Fetcher
  u.make_fetch_def = MotivationalUtilities::MakeFetchDef
  u.make_context = MotivationalUtilities::MakeContext
  u.make_options = MotivationalUtilities::MakeOptions
  u.make_request = MotivationalUtilities::MakeRequest
  u.make_response = MotivationalUtilities::MakeResponse
  u.make_result = MotivationalUtilities::MakeResult
  u.make_point = MotivationalUtilities::MakePoint
  u.make_spec = MotivationalUtilities::MakeSpec
  u.make_url = MotivationalUtilities::MakeUrl
  u.param = MotivationalUtilities::Param
  u.prepare_auth = MotivationalUtilities::PrepareAuth
  u.prepare_body = MotivationalUtilities::PrepareBody
  u.prepare_headers = MotivationalUtilities::PrepareHeaders
  u.prepare_method = MotivationalUtilities::PrepareMethod
  u.prepare_params = MotivationalUtilities::PrepareParams
  u.prepare_path = MotivationalUtilities::PreparePath
  u.prepare_query = MotivationalUtilities::PrepareQuery
  u.result_basic = MotivationalUtilities::ResultBasic
  u.result_body = MotivationalUtilities::ResultBody
  u.result_headers = MotivationalUtilities::ResultHeaders
  u.transform_request = MotivationalUtilities::TransformRequest
  u.transform_response = MotivationalUtilities::TransformResponse
}
