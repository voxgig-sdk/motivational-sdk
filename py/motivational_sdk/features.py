# Motivational SDK feature factory

from motivational_sdk.feature.base_feature import MotivationalBaseFeature
from motivational_sdk.feature.ratelimit_feature import MotivationalRatelimitFeature
from motivational_sdk.feature.retry_feature import MotivationalRetryFeature
from motivational_sdk.feature.test_feature import MotivationalTestFeature
from motivational_sdk.feature.timeout_feature import MotivationalTimeoutFeature


_FEATURES = {
    "base": lambda: MotivationalBaseFeature(),
    "ratelimit": lambda: MotivationalRatelimitFeature(),
    "retry": lambda: MotivationalRetryFeature(),
    "test": lambda: MotivationalTestFeature(),
    "timeout": lambda: MotivationalTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
