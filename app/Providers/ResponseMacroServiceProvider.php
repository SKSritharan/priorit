<?php

namespace App\Providers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class ResponseMacroServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Response::macro('successMessage', function ($message = null, $status = JsonResponse::HTTP_OK): JsonResponse {
            return Response::json([
                'message' => $message ?? __('responses.general.success'),
            ], $status);
        });

        Response::macro('success', function ($data, $status = JsonResponse::HTTP_OK): JsonResponse {
            return Response::json(['data' => $data], $status);
        });

        Response::macro('errorMessage', function ($message = null, $status = JsonResponse::HTTP_BAD_REQUEST): JsonResponse {
            return Response::json([
                'message' => $message ?? __('responses.general.error'),
            ], $status);
        });

        Response::macro('error', function ($data, $status = JsonResponse::HTTP_BAD_REQUEST): JsonResponse {
            return Response::json(['data' => $data], $status);
        });
    }
}
