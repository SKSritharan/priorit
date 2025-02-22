import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        loading: false,
        loadingTasks: false,
        error: null,
        maxTasks: 5,
    }),

    getters: {
        //
    },

    actions: {
        async fetchTasks() {
            this.loading = true
            this.loadingTasks = true
            this.error = null
            try {
                await new Promise(resolve => setTimeout(resolve, 1500))
                const response = await axios.get('/api/tasks')
                this.tasks = response.data.data.slice(0, this.maxTasks)
            } catch (error) {
                this.error = 'Failed to fetch tasks'
                toast.error("Failed to load tasks")
                console.error(error)
            } finally {
                this.loading = false
                this.loadingTasks = false
            }
        },

        async addTask(newTask) {
            const toast = useToast()
            this.loading = true
            this.error = null
            try {
                const response = await axios.post('/api/tasks', newTask)
                // Add new task to the beginning of the array
                this.tasks.unshift(response.data.data)

                // Remove the oldest task if we exceed maxTasks
                if (this.tasks.length > this.maxTasks) {
                    const removedTask = this.tasks.pop()
                    // delete from backend
                    // await this.deleteTask(removedTask.id)
                }
                toast.success("Task created successfully!")
            } catch (error) {
                this.error = 'Failed to add task'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async markTaskAsComplete(taskId) {
            const toast = useToast()
            this.error = null
            try {
                const response = await axios.put(`/api/tasks/${taskId}/complete`)
                console.log('task id:', taskId, 'response:', response)
                const task = this.tasks.find(t => t.id === taskId)
                if (task) {
                    task.completed = !task.completed
                    if (task.completed) {
                        this.tasks = this.tasks.filter(t => t.id !== taskId)
                    }
                    toast.info(task.completed ? "Task marked as complete!" : "Task marked as incomplete")
                }
            } catch (error) {
                this.error = 'Failed to update task'
                console.error(error)
            }
        },

        async deleteTask(taskId) {
            const toast = useToast()
            try {
                await axios.delete(`/api/tasks/${taskId}`)
            } catch (error) {
                toast.error("Failed to delete task")
                console.error('Failed to delete task:', error)
            }
        },
    }
})
