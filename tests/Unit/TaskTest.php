<?php

use App\Models\Task;

test('task can be created', function () {
    $task = Task::factory()->make();

    expect($task)
        ->title->toBeString()
        ->description->toBeString()
        ->is_completed->toBeBool();
});

test('task can be marked as completed', function () {
    $task = Task::factory()->create(['is_completed' => false]);

    $task->is_completed = true;
    $task->save();

    expect($task->fresh()->is_completed)->toBeTrue();
});

test('tasks are ordered by latest first', function () {
    $newTask = Task::factory()->create([
        'created_at' => now()
    ]);

    $latestTask = Task::latest()->first();

    expect($latestTask->id)->toBe($newTask->id);
});
