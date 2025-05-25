export const allowedStates = ['pending', 'in-progress', 'done'] as const

export type TaskState = (typeof allowedStates)[number]

export const allowedFilters = ['all', ...allowedStates] as const
export type AllowedFilters = (typeof allowedFilters)[number]

export interface Task {
  id: string
  title: string
  description: string
  datetime: Date
  state: TaskState
}
