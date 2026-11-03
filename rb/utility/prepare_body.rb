# Motivational SDK utility: prepare_body
require_relative 'media'
module MotivationalUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return MotivationalUtilities.raw_body(ctx.reqdata) if MotivationalUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
