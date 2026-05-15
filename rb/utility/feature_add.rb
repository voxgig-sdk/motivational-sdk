# Motivational SDK utility: feature_add
module MotivationalUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
