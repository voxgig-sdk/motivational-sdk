<?php
declare(strict_types=1);

// Motivational SDK utility: result_headers

class MotivationalResultHeaders
{
    public static function call(MotivationalContext $ctx): ?MotivationalResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
