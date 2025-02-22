<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Response::success(
            TaskResource::collection(
                Task::latest()->paginate(5)
            )
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        try {
            $task = Task::create($request->validated());
            return Response::successMessage(__('responses.task.created'));
        } catch (\Exception $e) {
            return Response::errorMessage($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($taskId)
    {
        try {
            $task = Task::findOrFail($taskId);
            return Response::success(new TaskResource($task));
        } catch (\Exception $e) {
            return Response::errorMessage(__('responses.task.not_found'));
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        try {
            $task->update($request->validated());
            return Response::successMessage(__('responses.task.updated'));
        } catch (\Exception $e) {
            return Response::errorMessage($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($taskId)
    {
        try {
            $task = Task::findOrFail($taskId);
            $task->delete();
            return Response::successMessage(__('responses.task.deleted'));
        } catch (\Exception $e) {
            return Response::errorMessage(__('responses.task.not_found'));
        }
    }

    /**
     * mark task as completed
     */
    public function markAsCompleted(Task $task)
    {
        try {
            $task->update(['completed' => true]);
            return Response::successMessage(__('responses.task.completed'));
        } catch (\Exception $e) {
            return Response::errorMessage(__('responses.task.not_found'));
        }
    }
}
