<template>
    <div class="container mx-auto p-6 h-screen">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AddTaskForm />
            <TaskList />
        </div>
    </div>
</template>

<script>
import AddTaskForm from './Task/AddTaskForm.vue'
import TaskList from './Task/TaskList.vue'

export default {
    components: {
        AddTaskForm,
        TaskList
    }
}
</script>
