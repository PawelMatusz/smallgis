import { type AllowedFilters } from '@/types/taskManager'

export const getReadableName = (state: AllowedFilters) => {
  switch (state) {
    case 'pending':
      return 'Oczekujące'
    case 'done':
      return 'Ukończone'
    case 'in-progress':
      return 'W trakcie'
    case 'all':
      return 'Wszystko'
    default:
      return state
  }
}
