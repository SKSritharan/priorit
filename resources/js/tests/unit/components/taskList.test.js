import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it, vi } from 'vitest'
import TaskList from '../../../components/Task/TaskList.vue'
import {useTaskStore} from "../../../stores/taskStore";

describe('TaskList', () => {
    const mockTasks = [
        { id: 1, title: 'Task 1', description: 'Desc 1', is_completed: false },
        { id: 2, title: 'Task 2', description: 'Desc 2', is_completed: true }
    ]

    const mountComponent = (tasks = [], loadingTasks = false) => {
        return mount(TaskList, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vi.fn,
                    initialState: {
                        tasks: { tasks, loadingTasks }
                    }
                })]
            }
        })
    }

    it('renders task list when tasks exist', () => {
        const wrapper = mountComponent(mockTasks)
        expect(wrapper.findAll('.task-item')).toHaveLength(2)
    })

    it('shows empty state when no tasks exist', () => {
        const wrapper = mountComponent([])
        expect(wrapper.find('.empty-state').exists()).toBe(true)
        expect(wrapper.text()).toContain('No tasks yet')
    })

    it('renders skeleton loader when loading', async () => {
        const wrapper = mountComponent([], true)
        const taskStore = useTaskStore()
        taskStore.loadingTasks = true
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ name: 'TaskSkeleton' }).exists()).toBe(true)
    })
})
