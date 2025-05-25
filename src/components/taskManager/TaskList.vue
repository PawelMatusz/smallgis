<template>
  <TaskFilters
    @update:selectedState="onSelectedChange"
    @update:sortTask="onSortChange"
  ></TaskFilters>
  <h2 class="text-xl" v-once>{{ listTitle }}</h2>
  <ul class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
    <li
      class="relative mx-auto items-center gap-x-4 rounded-xl p-6 shadow-lg outline outline-black/5"
      :class="[task.state === 'done' ? 'bg-green-500' : '']"
      v-for="task in sortedTasks"
      :key="task.id"
    >
      <TaskListItem
        :id="task.id"
        :key="task.id"
        :title="task.title"
        :description="task.description"
        :datetime="task.datetime"
        :state="task.state"
        @edit="taskStore.editTask"
        @delete="taskStore.deleteTask(task.id)"
        @done="taskStore.updateTaskState(task.id, 'done')"
      >
      </TaskListItem>
    </li>
  </ul>
</template>

<script setup async lang="ts">
import { computed, ref } from 'vue'
import TaskListItem from './TaskListItem.vue'
import TaskFilters from './TaskFilters.vue'
import { useTaskManagerStore } from '@/stores/taskManager'
import { type AllowedFilters } from '@/types/taskManager'

const props = defineProps<{
  listTitle: string
}>()
const taskStore = useTaskManagerStore()
const selectedState = ref<AllowedFilters>('all')
const sortOrder = ref<'asc' | 'desc'>('desc')
const searchQuery = ref('')

function onSelectedChange(newState: AllowedFilters) {
  selectedState.value = newState
}
function onSortChange(sort: 'asc' | 'desc') {
  sortOrder.value = sort
}

const filteredTasks = computed(() => {
  return taskStore.filterTasksByState(selectedState.value)
})

const sortedTasks = computed(() => {
  return [...filteredTasks.value].sort((a, b) => {
    return sortOrder.value === 'desc'
      ? new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      : new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
  })
})

await taskStore.getTasks()
</script>
