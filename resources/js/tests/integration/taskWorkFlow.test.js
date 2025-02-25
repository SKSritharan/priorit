import {mount, flushPromises} from '@vue/test-utils'
import {createTestingPinia} from '@pinia/testing'
import {describe, expect, it, vi} from 'vitest'
import axios from 'axios'
import App from '../../components/App.vue'
import {useTaskStore} from '../../stores/taskStore.js'

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
                    stubActions:false
                })]
            }
        })
    }

    it('completes full task management workflow', async () => {
        // Mock API responses
        axios.get.mockResolvedValueOnce({ data: { data: [] } }) // Initial empty task list
        axios.post.mockResolvedValueOnce({
            data: { data: { id: 1, title: 'New Task', description: 'Test Desc', is_completed: false } }
        });

        const wrapper = mountApp()
        const store = useTaskStore()

        // Wait for initial load
        await wrapper.vm.$nextTick()

        // Add new task
        await wrapper.find('input[type="text"]').setValue('New Task')
        await wrapper.find('textarea').setValue('Test Desc')
        await wrapper.find('form').trigger('submit')

        // Wait for API call to complete
        await flushPromises()

        // Wait for the task to be added
        await wrapper.vm.$nextTick()

        // Verify task is in the store
        expect(store.tasks.length).toBe(1)
        expect(store.tasks[0].title).toBe('New Task')
    })

    it('handles errors gracefully', async () => {
        // Mock API error
        axios.get.mockRejectedValueOnce(new Error('API Error'))

        const wrapper = mountApp()
        const store = useTaskStore()

        // Wait for error to be displayed
        await wrapper.vm.$nextTick()

        // Verify loading spinner is hidden
        expect(wrapper.text()).not.toContain('Loading...')

        expect(store.tasks).toEqual([])
    })
})
