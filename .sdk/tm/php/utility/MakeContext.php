<?php
declare(strict_types=1);

// Motivational SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MotivationalMakeContext
{
    public static function call(array $ctxmap, ?MotivationalContext $basectx): MotivationalContext
    {
        return new MotivationalContext($ctxmap, $basectx);
    }
}
