<template>
    <div class="task-item bg-gray-100 rounded-lg p-4 flex justify-between items-center">
        <div>
            <h3 class="font-medium">{{ task.title }}</h3>
            <p class="text-sm text-gray-600">{{ task.description }}</p>
        </div>
        <button
            @click="$emit('mark-done', task.id)"
            class="px-3 py-1 bg-gray-200 rounded text-sm"
            :class="{ 'bg-green-200': task.completed }"
        >
            Done
        </button>
    </div>
</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    }
}
</script>
