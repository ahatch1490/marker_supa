<template>
  <div v-if="project" class="@container">
    <div class="@[480px]:px-4 @[480px]:py-3">
      <div
        class="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-xl min-h-80"
        :style="backgroundImageStyle"
      >
        <div class="flex p-4">
          <router-link
            :to="`/project/${project.id}`"
            class="text-white tracking-light text-[28px] font-bold leading-tight hover:underline"
          >
            {{ project.title }}
          </router-link>
        </div>
      </div>
    </div>
    <p class="text-[#121416] text-base font-normal leading-normal pb-3 pt-1 px-4">
      {{ project.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../lib/supabase'

const props = defineProps<{
  project: Project | null
}>()

const backgroundImageStyle = computed(() => {
  if (!props.project) return ''
  
  const defaultImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcfwoKySRC2P67wBwhe2gfWzPVN7yxUOS-puZx1GdR__zulfKKpENQQMBphphoTp3boSvDHr7j36uBmOiIM_TDWe0zCtuHZGB4uCHowS7scfwMPkXKE79FQsmPeJC02an63ue1QSVX9fWEjmOVyvNY6BnjBOHE-yEoISvcDkm1SKv3uMCkgtYaU-DDb8MnCsh_H1mxKt5ZW-dwZY7Jzf01--8zUl8tVEt044iu71iVETytqoViLEuC9F9PlY_ZMqreKqpB_0NBXRu4'
  const imageUrl = props.project.images?.[0] || defaultImage
  
  return `background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url('${imageUrl}');`
})
</script>