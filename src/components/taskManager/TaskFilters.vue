<template>
  <h2 class="text-xl">Filtry</h2>
  <div class="w-full flex flex-wrap justify-center items-center md:flex-nowrap my-6 gap-4">
    <div class="w-full md:w-1/3">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="search"
        v-once
      >
        Szukaj
      </label>
      <input
        class="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="searchText"
        role="search"
        id="search"
        placeholder="Szukaj zadania..."
      />
    </div>
    <div class="w-full md:w-1/3">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="state"
        v-once
      >
        Status
      </label>
      <div class="relative">
        <select
          class="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="state"
          v-model="selectedState"
        >
          <option v-for="state in allowedFilters" :value="state">
            {{ getReadableName(state) }}
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="sort">
        Sortowanie
      </label>
      <div class="relative">
        <select
          class="w-full block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          v-model="sortTask"
          id="sort"
        >
          <option value="desc">Od najnowszego</option>
          <option value="asc">Od najstarszego</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <hr class="my-2" />
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { allowedFilters, type AllowedFilters } from '@/types/taskManager'
import { getReadableName } from '@/helpers/taskManager'

const searchText = ref<string>('')

const selectedState = ref<AllowedFilters>('all')
const sortTask = ref('desc')
const emit = defineEmits(['update:selectedState', 'update:sortTask'])

watch(selectedState, (newState) => {
  emit('update:selectedState', newState)
})
watch(sortTask, (sort) => {
  emit('update:sortTask', sort)
})
</script>
