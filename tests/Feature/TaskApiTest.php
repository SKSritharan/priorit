<?php

use App\Models\Task;

test('can fetch tasks', function () {
    $response = $this->getJson('/api/tasks');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'description',
                    'is_completed',
                    'created_at',
                ],
            ],
        ]);
});

test('can create a task', function () {
    $response = $this->postJson('/api/tasks', [
        'title' => 'Task 1',
        'description' => 'Description 1',
    ]);

    $response
        ->assertStatus(200)
        ->assertJson([
            'data' => [
                'title' => 'Task 1',
                'description' => 'Description 1',
                'is_completed' => false,
            ],
        ]);
});

test('can mark a task as completed', function () {
    $task = Task::factory()->create(['is_completed' => false]);

    $response = $this->putJson("/api/tasks/{$task->id}/complete");

    $response
        ->assertStatus(200)
        ->assertJson([
            'message' => 'Task marked as completed successfully',
        ]);
});
