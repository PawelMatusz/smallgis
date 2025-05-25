<template>
  <form role="form" @submit.prevent="submit">
    <h2 class="text-2xl">Dodaj nowy task</h2>
    <div class="flex flex-wrap justify-center items-center md:flex-nowrap my-6 gap-4">
      <div class="w-full md:w-1/3 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="title"
        >
          Tytuł
        </label>
        <input
          class="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="title"
          v-model="title"
          placeholder="Dodaj tytuł"
        />
      </div>
      <div class="w-full md:w-1/3 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="description"
        >
          Opis
        </label>
        <input
          class="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="description"
          v-model="description"
          placeholder="Dodaj opis"
        />
      </div>
      <div class="w-full md:w-1/3 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="state"
        >
          Status
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="state"
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
        class="w-full md:w-1/3 rounded-full px-4 py-4 bg-green-500 text-sm leading-5 font-semibold text-white hover:bg-green-700"
        aria-label="Dodaj nowy task"
      >
        Dodaj
      </button>
    </div>
    <hr class="my-2" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTaskManagerStore } from '@/stores/taskManager'
import { type TaskState } from '@/types/taskManager'

const title = ref('')
const description = ref('')
const state = ref<TaskState>('pending')
const taskStore = useTaskManagerStore()

function submit() {
  if (!title.value && !description.value) return

  taskStore.addTask(title.value, description.value, state.value)
  title.value = ''
}
</script>
