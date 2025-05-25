<template>
  <div>
    <h3><span class="font-bold">Tytuł:</span> {{ title }}</h3>
    <p><span class="font-bold">Opis:</span> {{ description }}</p>
    <p><span class="font-bold">Status:</span> {{ getReadableName(state) }}</p>
    <p v-once><span class="font-bold">Utworzono:</span> {{ formattedDate }}</p>
  </div>
  <div class="flex justify-center gap-4 mt-5">
    <EditTaskModal :taskId="id" :openText="'Edytuj'" :closeText="'Zamknij modal'"> </EditTaskModal>
    <button
      class="rounded-full bg-green-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-green-700"
      :class="[state === 'done' ? 'bg-slate-500' : '']"
      @click="$emit('done')"
      :disabled="state === 'done'"
    >
      Zakończ
    </button>
    <button
      class="rounded-full bg-red-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-red-700"
      @click="$emit('delete')"
    >
      Usuń
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EditTaskModal from './EditTaskModal.vue'
import { getReadableName } from '@/helpers/taskManager'
import type { TaskState } from '@/types/taskManager'

interface IProps {
  title: string
  description: string
  state: TaskState
  datetime: Date
  id: string
}
const props = defineProps<IProps>()

const emit = defineEmits(['edit', 'delete', 'done'])

const formattedDate = computed(() => {
  return props.datetime ? props.datetime.toLocaleString() : ''
})
</script>
