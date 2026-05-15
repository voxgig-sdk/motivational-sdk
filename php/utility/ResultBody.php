<?php
declare(strict_types=1);

// Motivational SDK utility: result_body

class MotivationalResultBody
{
    public static function call(MotivationalContext $ctx): ?MotivationalResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
