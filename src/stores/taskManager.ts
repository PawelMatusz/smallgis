import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import { type TaskState, type Task, type AllowedFilters } from '@/types/taskManager'

const mockTasks: Task[] = [
  {
    id: uuid(),
    title: 'Task 1',
    description: 'Description for task 1',
    datetime: new Date(),
    state: 'pending',
  },
  {
    id: uuid(),
    title: 'Task 2',
    description: 'Description for task 2',
    datetime: new Date(),
    state: 'pending',
  },
  {
    id: uuid(),
    title: 'Task 3',
    description: 'Description for task 3',
    datetime: new Date(),
    state: 'done',
  },
  {
    id: uuid(),
    title: 'Task 4',
    description: 'Description for task 4',
    datetime: new Date(),
    state: 'pending',
  },
  {
    id: uuid(),
    title: 'Task 5',
    description: 'Description for task 5',
    datetime: new Date(),
    state: 'pending',
  },
  {
    id: uuid(),
    title: 'Task 6',
    description: 'Description for task 6',
    datetime: new Date(),
    state: 'in-progress',
  },
  {
    id: uuid(),
    title: 'Task 7',
    description: 'Description for task 7',
    datetime: new Date(),
    state: 'pending',
  },
  {
    id: uuid(),
    title: 'Task 8',
    description: 'Description for task 8',
    datetime: new Date(),
    state: 'done',
  },
  {
    id: uuid(),
    title: 'Task 9',
    description: 'Description for task 9',
    datetime: new Date(),
    state: 'in-progress',
  },
  {
    id: uuid(),
    title: 'Task 10',
    description: 'Description for task 10',
    datetime: new Date(),
    state: 'pending',
  },
]
const GET_TASK_DELAY = 1000
export const useTaskManagerStore = defineStore('taskManager', {
  state: () => ({
    tasks: [] as Task[],
    nextId: uuid(),
  }),

  actions: {
    async getTasks() {
      await new Promise((resolve) => setTimeout(resolve, GET_TASK_DELAY))
      this.tasks = mockTasks
    },
    addTask(title: string, description: string, state: TaskState) {
      this.tasks.push({
        id: uuid(),
        title,
        description,
        datetime: new Date(),
        state,
      })
    },
    editTask(taskId: string, newTaskData: Omit<Task, 'id' | 'datetime'>) {
      const task = this.tasks.find((t) => t.id === taskId)
      const { title, description, state } = newTaskData
      if (task) {
        task.title = title
        task.description = description
        task.state = state
      }
    },
    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((t) => t.id !== taskId)
    },
    filterTasksByState(stateFilter: AllowedFilters) {
      if (stateFilter === 'all') {
        return this.tasks
      }
      return this.tasks.filter((task) => task.state === stateFilter)
    },
    updateTaskState(id: string, newState: TaskState) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) {
        task.state = newState
      }
    },
  },
})
