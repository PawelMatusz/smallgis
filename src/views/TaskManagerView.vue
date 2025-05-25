<script setup lang="ts">
import TaskForm from '@/components/taskManager/TaskForm.vue'
import TaskList from '@/components/taskManager/TaskList.vue'
</script>

<template>
  <div class="p-5 mx-auto">
    <header class="text-center text-2xl"><h1>SmallGis rekrutacja</h1></header>
    <main role="main" class="w-full md:w-1/2 mx-auto mt-10">
      <TaskForm></TaskForm>
      <Suspense>
        <template #fallback
          ><svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
        </template>
        <TaskList listTitle="Task Manager"></TaskList>
      </Suspense>
    </main>
    <footer class="text-center">Zadanie</footer>
  </div>
</template>
