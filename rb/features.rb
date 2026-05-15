# Motivational SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MotivationalFeatures
  def self.make_feature(name)
    case name
    when "base"
      MotivationalBaseFeature.new
    when "test"
      MotivationalTestFeature.new
    else
      MotivationalBaseFeature.new
    end
  end
end
