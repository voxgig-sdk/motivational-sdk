<?php
declare(strict_types=1);

// Motivational SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

MotivationalUtility::setRegistrar(function (MotivationalUtility $u): void {
    $u->clean = [MotivationalClean::class, 'call'];
    $u->done = [MotivationalDone::class, 'call'];
    $u->make_error = [MotivationalMakeError::class, 'call'];
    $u->feature_add = [MotivationalFeatureAdd::class, 'call'];
    $u->feature_hook = [MotivationalFeatureHook::class, 'call'];
    $u->feature_init = [MotivationalFeatureInit::class, 'call'];
    $u->fetcher = [MotivationalFetcher::class, 'call'];
    $u->make_fetch_def = [MotivationalMakeFetchDef::class, 'call'];
    $u->make_context = [MotivationalMakeContext::class, 'call'];
    $u->make_options = [MotivationalMakeOptions::class, 'call'];
    $u->make_request = [MotivationalMakeRequest::class, 'call'];
    $u->make_response = [MotivationalMakeResponse::class, 'call'];
    $u->make_result = [MotivationalMakeResult::class, 'call'];
    $u->make_point = [MotivationalMakePoint::class, 'call'];
    $u->make_spec = [MotivationalMakeSpec::class, 'call'];
    $u->make_url = [MotivationalMakeUrl::class, 'call'];
    $u->param = [MotivationalParam::class, 'call'];
    $u->prepare_auth = [MotivationalPrepareAuth::class, 'call'];
    $u->prepare_body = [MotivationalPrepareBody::class, 'call'];
    $u->prepare_headers = [MotivationalPrepareHeaders::class, 'call'];
    $u->prepare_method = [MotivationalPrepareMethod::class, 'call'];
    $u->prepare_params = [MotivationalPrepareParams::class, 'call'];
    $u->prepare_path = [MotivationalPreparePath::class, 'call'];
    $u->prepare_query = [MotivationalPrepareQuery::class, 'call'];
    $u->result_basic = [MotivationalResultBasic::class, 'call'];
    $u->result_body = [MotivationalResultBody::class, 'call'];
    $u->result_headers = [MotivationalResultHeaders::class, 'call'];
    $u->transform_request = [MotivationalTransformRequest::class, 'call'];
    $u->transform_response = [MotivationalTransformResponse::class, 'call'];
});
