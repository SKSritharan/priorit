<?php

use App\Http\Controllers\API\TaskController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'tasks'], function () {
    Route::get('/', [TaskController::class, 'index']);
    Route::post('/', [TaskController::class, 'store']);
    Route::get('/{taskId}', [TaskController::class, 'show']);
    Route::put('/{taskId}', [TaskController::class, 'update']);
    Route::delete('/{taskId}', [TaskController::class, 'destroy']);
    Route::put('/{taskId}/complete', [TaskController::class, 'markAsCompleted']);
});
