<template>
    <div class="bg-white rounded-lg p-6 shadow">
        <h2 class="text-xl font-semibold mb-4">Add a Task</h2>
        <div v-if="taskStore.error" class="mb-4 text-red-600">
            {{ taskStore.error }}
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="mb-4">
                <label class="block text-sm font-medium mb-2">Title</label>
                <input
                    v-model="task.title"
                    type="text"
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task title"
                    required
                >
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-2">Description</label>
                <textarea
                    v-model="task.description"
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task description"
                    rows="3"
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                :disabled="taskStore.loading"
            >
                {{ taskStore.loading ? 'Adding...' : 'Add' }}
            </button>
        </form>
    </div>
</template>

<script>
import { useTaskStore } from '../../stores/taskStore'

export default {
    data() {
        return {
            task: {
                title: '',
                description: ''
            }
        }
    },
    setup() {
        const taskStore = useTaskStore()
        return { taskStore }
    },
    methods: {
        async handleSubmit() {
            await this.taskStore.addTask({ ...this.task })
            if (!this.taskStore.error) {
                this.task.title = ''
                this.task.description = ''
            }
        }
    }
}
</script>
