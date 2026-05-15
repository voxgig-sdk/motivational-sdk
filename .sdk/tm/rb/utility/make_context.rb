# Motivational SDK utility: make_context
require_relative '../core/context'
module MotivationalUtilities
  MakeContext = ->(ctxmap, basectx) {
    MotivationalContext.new(ctxmap, basectx)
  }
end
