import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it, vi } from 'vitest'
import AddTaskForm from '../../../components/Task/AddTaskForm.vue'
import { useTaskStore } from '../../../stores/taskStore'

describe('AddTaskForm', () => {
    const mountComponent = () => {
        return mount(AddTaskForm, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vi.fn
                })]
            }
        })
    }

    it('renders correctly', () => {
        const wrapper = mountComponent()
        expect(wrapper.find('form').exists()).toBe(true)
        expect(wrapper.find('input[type="text"]').exists()).toBe(true)
        expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('updates v-model values', async () => {
        const wrapper = mountComponent()

        await wrapper.find('input[type="text"]').setValue('New Task')
        await wrapper.find('textarea').setValue('Task Description')

        expect(wrapper.vm.task.title).toBe('New Task')
        expect(wrapper.vm.task.description).toBe('Task Description')
    })

    it('calls addTask action on form submission', async () => {
        const wrapper = mountComponent()
        const taskStore = useTaskStore() // Access the store

        // Mock the addTask action
        taskStore.addTask = vi.fn()

        // Fill out the form
        await wrapper.find('input[type="text"]').setValue('New Task')
        await wrapper.find('textarea').setValue('Task Description')
        await wrapper.find('form').trigger('submit')

        // Verify that addTask was called with the correct data
        expect(taskStore.addTask).toHaveBeenCalledWith({
            title: 'New Task',
            description: 'Task Description'
        })
    })

    it('clears form after submission', async () => {
        const wrapper = mountComponent()
        const taskStore = useTaskStore() // Access the store

        // Mock the addTask action to simulate success
        taskStore.addTask = vi.fn().mockResolvedValue({})

        // Fill out the form
        await wrapper.find('input[type="text"]').setValue('New Task')
        await wrapper.find('textarea').setValue('Task Description')
        await wrapper.find('form').trigger('submit')

        // Wait for the next tick to allow the form to clear
        await wrapper.vm.$nextTick()

        // Verify that the form fields are cleared
        expect(wrapper.vm.task.title).toBe('')
        expect(wrapper.vm.task.description).toBe('')
    })
})
