# Motivational SDK feature factory

from feature.base_feature import MotivationalBaseFeature
from feature.test_feature import MotivationalTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MotivationalBaseFeature(),
        "test": lambda: MotivationalTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
