# Motivational SDK utility: make_context

from motivational_sdk.core.context import MotivationalContext


def make_context_util(ctxmap, basectx):
    return MotivationalContext(ctxmap, basectx)
