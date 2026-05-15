<?php
declare(strict_types=1);

// Motivational SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class MotivationalFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new MotivationalBaseFeature();
            case "test":
                return new MotivationalTestFeature();
            default:
                return new MotivationalBaseFeature();
        }
    }
}
