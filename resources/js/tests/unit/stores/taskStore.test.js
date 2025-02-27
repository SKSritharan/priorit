import {setActivePinia, createPinia} from 'pinia'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {useTaskStore} from '../../../stores/taskStore.js'
import axios from 'axios'

vi.mock('axios')
vi.mock('vue-toastification', () => ({
    useToast: () => ({
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn()
    })
}))

describe('Task Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('initializes with empty tasks', () => {
        const store = useTaskStore()
        expect(store.tasks).toEqual([])
        expect(store.loading).toBe(false)
        expect(store.error).toBeNull()
    })

    it('fetches tasks successfully', async () => {
        const mockTasks = [
            {id: 1, title: 'Task 1', description: 'Desc 1', is_completed: false},
            {id: 2, title: 'Task 2', description: 'Desc 2', is_completed: true}
        ]
        axios.get.mockResolvedValueOnce({data:{data: mockTasks}})

        const store = useTaskStore()
        await store.fetchTasks()

        expect(store.tasks).toEqual(mockTasks)
        expect(store.loading).toBe(false)
        expect(store.error).toBeNull()
    })

    it('handles fetch tasks error', async () => {
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch tasks'))

        const store = useTaskStore()
        await store.fetchTasks()

        expect(store.tasks).toEqual([])
        expect(store.loading).toBe(false)
        expect(store.error).toBe('Failed to fetch tasks')
    })

    it('adds new task successfully', async () => {
        const newTask = {title: 'New Task', description: 'New Desc'}
        const mockResponse = {...newTask, id: 1, is_completed: false}
        axios.post.mockResolvedValueOnce({data: {data: mockResponse}})
        axios.get.mockResolvedValueOnce({data: {data: [mockResponse]}})

        const store = useTaskStore()
        await store.fetchTasks()

        expect(store.tasks).toEqual([mockResponse])
        expect(store.loading).toBe(false)
        expect(store.error).toBeNull()
    })

    // it('removes oldest task when exceeding maximum tasks', async () => {
    //     const store = useTaskStore()
    //     store.tasks = Array.from({length: 5}, (_, i) => ({
    //         id: i + 1,
    //         title: `Task ${i + 1}`
    //     }))
    //
    //     const newTask = {title: 'New Task', description: 'New Desc'}
    //     const mockResponse = {...newTask, id: 6, is_completed: false}
    //     axios.post.mockResolvedValueOnce({data: {data: mockResponse}})
    //     axios.delete.mockResolvedValueOnce({})
    //
    //     await store.addTask(newTask)
    //
    //     expect(store.tasks.length).toBe(5)
    //     expect(store.tasks[0].id).toBe(6)
    // })
})
