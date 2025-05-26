<script setup lang="ts">
import { useTaskManagerStore } from '@/stores/taskManager'
import type { TaskState } from '@/types/taskManager'
import { reactive, ref } from 'vue'

interface IProps {
  openText: string
  closeText: string
  taskId: string
}
const props = defineProps<IProps>()

const open = ref<Boolean>(false)
const title = ref('')
const description = ref('')
const state = ref<TaskState>('pending')
const taskStore = useTaskManagerStore()

const newTaskData = reactive({
  title,
  description,
  state,
})

function submit() {
  if (!title.value && !description.value) return
  taskStore.editTask(props.taskId, newTaskData)
  title.value = ''
  description.value = ''
  open.value = false
}
</script>

<template>
  <button class="open-button" @click="open = true" v-once>{{ openText }}</button>

  <div
    role="modal"
    aria-hidden="true"
    v-if="open"
    class="modal flex justify-center items-center bg-white px-5"
  >
    <div>
      <form role="form" @submit.prevent="submit">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :for="title"
          >
            Tytuł
          </label>
          <input
            class="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :id="title"
            v-model="title"
            placeholder="Dodaj tytuł"
          />
        </div>
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :for="description"
          >
            Opis
          </label>
          <input
            class="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :id="description"
            v-model="description"
            placeholder="Dodaj opis"
          />
        </div>
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :for="state"
          >
            Status
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :id="state"
              v-model="state"
            >
              <option value="pending">Oczekujące</option>
              <option value="in-progress">W trakcie</option>
              <option value="done">Ukończone</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <button
          class="rounded-full bg-green-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-green-700"
        >
          Zapisz
        </button>
        <button
          class="rounded-full bg-black px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-slate-500"
          @click="open = false"
          v-once
        >
          Anuluj
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  display: flex;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 100px;
  width: 100%;
  max-width: 600px;
  max-height: 600px;
}
.open-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
