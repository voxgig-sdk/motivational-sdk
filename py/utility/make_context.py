# Motivational SDK utility: make_context

from core.context import MotivationalContext


def make_context_util(ctxmap, basectx):
    return MotivationalContext(ctxmap, basectx)
