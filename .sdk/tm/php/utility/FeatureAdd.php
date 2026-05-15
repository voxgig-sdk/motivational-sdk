<?php
declare(strict_types=1);

// Motivational SDK utility: feature_add

class MotivationalFeatureAdd
{
    public static function call(MotivationalContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
