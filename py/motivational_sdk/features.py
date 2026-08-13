# Motivational SDK feature factory

from motivational_sdk.feature.base_feature import MotivationalBaseFeature
from motivational_sdk.feature.test_feature import MotivationalTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MotivationalBaseFeature(),
        "test": lambda: MotivationalTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
