# Motivational SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MotivationalFeatures
  def self.make_feature(name)
    case name
    when "base"
      MotivationalBaseFeature.new
    when "ratelimit"
      MotivationalRatelimitFeature.new
    when "retry"
      MotivationalRetryFeature.new
    when "test"
      MotivationalTestFeature.new
    when "timeout"
      MotivationalTimeoutFeature.new
    else
      MotivationalBaseFeature.new
    end
  end
end
