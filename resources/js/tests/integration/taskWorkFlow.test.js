import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import App from '../../components/App.vue'
import { useTaskStore } from '../../stores/taskStore.js'

vi.mock('axios')
vi.mock('vue-toastification', () => ({
    useToast: () => ({
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn()
    })
}))

describe('Task Management Workflow', () => {
    const mountApp = () => {
        return mount(App, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vi.fn,
                    stubActions: false
                })]
            }
        })
    }

    it('completes full task management workflow', async () => {
        // Mock API responses
        axios.get.mockResolvedValueOnce({ data: { data: [{ id: 1, title: 'Task 1', completed: false }] } })
        axios.post.mockResolvedValueOnce({})
        axios.put.mockResolvedValueOnce({})
        axios.delete.mockResolvedValueOnce({})

        const wrapper = mountApp()
        const store = useTaskStore()

        // Fetch tasks
        await store.fetchTasks()
        await flushPromises()

        // Verify tasks are fetched
        expect(store.tasks).toEqual([{ id: 1, title: 'Task 1', completed: false }])
        expect(store.loading).toBe(false)
        expect(store.error).toBe('Failed to fetch tasks')

        // Add a new task
        const newTask = { title: 'New Task', completed: false }
        await store.addTask(newTask)
        await flushPromises()

        // Verify task is added
        expect(axios.post).toHaveBeenCalledWith('/api/tasks', newTask)
        expect(store.loading).toBe(false)
        expect(store.error).toBe('Failed to fetch tasks')

        // Mark task as complete
        await store.markTaskAsComplete(1)
        await flushPromises()

        // Verify task is marked as complete
        expect(axios.put).toHaveBeenCalledWith('/api/tasks/1/complete')
        expect(store.loading).toBe(false)
        expect(store.error).toBe('Failed to fetch tasks')
    })

    it('handles errors gracefully', async () => {
        // Mock API error
        axios.get.mockRejectedValueOnce(new Error('API Error'))

        const wrapper = mountApp()
        const store = useTaskStore()

        // Fetch tasks
        await store.fetchTasks()
        await flushPromises()

        // Verify error handling
        expect(store.tasks).toEqual([])
        expect(store.loading).toBe(false)
        expect(store.error).toBe('Failed to fetch tasks')
    })
})
