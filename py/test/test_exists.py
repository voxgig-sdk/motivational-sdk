# ProjectName SDK exists test

import pytest
from motivational_sdk import MotivationalSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MotivationalSDK.test(None, None)
        assert testsdk is not None
