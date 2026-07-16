<?php
declare(strict_types=1);

// Motivational SDK base feature

class MotivationalBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MotivationalContext $ctx, array $options): void {}
    public function PostConstruct(MotivationalContext $ctx): void {}
    public function PostConstructEntity(MotivationalContext $ctx): void {}
    public function SetData(MotivationalContext $ctx): void {}
    public function GetData(MotivationalContext $ctx): void {}
    public function GetMatch(MotivationalContext $ctx): void {}
    public function SetMatch(MotivationalContext $ctx): void {}
    public function PrePoint(MotivationalContext $ctx): void {}
    public function PreSpec(MotivationalContext $ctx): void {}
    public function PreRequest(MotivationalContext $ctx): void {}
    public function PreResponse(MotivationalContext $ctx): void {}
    public function PreResult(MotivationalContext $ctx): void {}
    public function PreDone(MotivationalContext $ctx): void {}
    public function PreUnexpected(MotivationalContext $ctx): void {}
}
