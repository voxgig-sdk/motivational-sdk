# Motivational SDK exists test

require "minitest/autorun"
require_relative "../Motivational_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = MotivationalSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
