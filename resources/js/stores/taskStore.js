import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        loading: false,
        loadingTasks: false,
        error: null,
        pagination: {
            perPage: 5,
        }
    }),

    getters: {
        //
    },

    actions: {
        async fetchTasks(page = 1) {
            const toast = useToast()
            this.loadingTasks = true
            this.error = null
            try {
                await new Promise(resolve => setTimeout(resolve, 1500))
                const response = await axios.get('/api/tasks', {
                    params: {
                        perPage: this.pagination.perPage,
                        isCompleted: 0,
                    }
                })

                this.tasks = response.data.data
            } catch (error) {
                this.error = 'Failed to fetch tasks'
                toast.error("Failed to load tasks")
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
                await axios.post('/api/tasks', newTask)

                // Refresh task list after adding a task
                await this.fetchTasks()

                toast.success("Task created successfully!")
            } catch (error) {
                this.error = 'Failed to add task'
                console.error(error)
                toast.error("Failed to create task")
            } finally {
                this.loading = false
            }
        },

        async markTaskAsComplete(taskId) {
            const toast = useToast()
            this.error = null
            try {
                await axios.put(`/api/tasks/${taskId}/complete`)

                // Refresh task list after marking a task as complete
                await this.fetchTasks()

                toast.info("Task marked as complete!")
            } catch (error) {
                this.error = 'Failed to update task'
                toast.error("Failed to update task")
                console.error(error)
            }
        },

        async deleteTask(taskId) {
            const toast = useToast()
            try {
                await axios.delete(`/api/tasks/${taskId}`)

                // Refresh task list after deleting a task
                await this.fetchTasks()

                toast.info("Task deleted successfully!")
            } catch (error) {
                toast.error("Failed to delete task")
                console.error('Failed to delete task:', error)
            }
        },
    }
})
