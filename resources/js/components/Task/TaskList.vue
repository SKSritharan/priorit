<template>
    <div>
        <TaskSkeleton v-if="taskStore.loadingTasks" :count="5" />

        <div v-else-if="taskStore.error" class="text-red-600 py-4">
            {{ taskStore.error }}
        </div>

        <div v-else class="space-y-4">
            <TransitionGroup
                v-if="taskStore.tasks.length > 0"
                name="task-list"
                tag="div"
                class="space-y-4"
            >
                <TaskItem
                    v-for="task in taskStore.tasks"
                    :key="task.id"
                    :task="task"
                    @mark-done="taskStore.toggleTaskComplete"
                />
            </TransitionGroup>

            <div
                v-else
                class="bg-gray-50 rounded-lg p-8 text-center"
            >
                <div class="text-gray-400 mb-2">
                    <svg
                        class="w-12 h-12 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                    </svg>
                    <h3 class="text-lg font-medium text-gray-500">No tasks yet</h3>
                    <p class="text-gray-400">Add your first task using the form on the left</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useTaskStore } from '../../stores/taskStore'
import TaskItem from './TaskItem.vue'
import TaskSkeleton from './TaskSkeleton.vue'

export default {
    components: {
        TaskItem,
        TaskSkeleton
    },
    setup() {
        const taskStore = useTaskStore()
        return { taskStore }
    },
    mounted() {
        this.taskStore.fetchTasks()
    }
}
</script>

<style scoped>
.task-list-enter-active,
.task-list-leave-active {
    transition: all 0.5s ease;
}

.task-list-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.task-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
