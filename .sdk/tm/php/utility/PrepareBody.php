<?php
declare(strict_types=1);

// Motivational SDK utility: prepare_body

class MotivationalPrepareBody
{
    public static function call(MotivationalContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
