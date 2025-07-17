<template>
  <div class="bg-white flex flex-col gap-3 pb-3">
    <div
      v-if="project.images && project.images.length > 0"
      class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
      :style="`background-image: url('${project.images[0]}');`"
    ></div>
    <div v-else class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl bg-[#f1f2f4] flex items-center justify-center">
      <svg class="h-12 w-12 text-[#6a7681]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>

    <div>
      <p class="text-[#121416] text-base font-medium leading-normal">{{ project.title }}</p>
      <p class="text-[#6a7681] text-sm font-normal leading-normal">{{ project.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '../lib/supabase'

defineProps<{
  project: Project
}>()

</script>
