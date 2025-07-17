<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabase'
import type { Project } from '../lib/supabase'
import ProjectSpotlight from '../components/ProjectSpotlight.vue'
import SearchBar from '../components/SearchBar.vue'
import ProjectCard from '../components/ProjectCard.vue'

const projects = ref<Project[]>([])
const loading = ref(true)
const searchQuery = ref('')
const spotlightProject = ref<Project | null>(null)

const filteredProjects = computed(() => {
  if (!searchQuery.value) return projects.value

  const terms = searchQuery.value.toLowerCase().split(' ')
  return projects.value.filter(project =>
    terms.some(term =>
      project.title.toLowerCase().includes(term) ||
      project.tags.some(tag => tag.toLowerCase().includes(term))
    )
  )
})

const fetchProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    projects.value = data || []

    // Add sample data if no projects exist
    if (projects.value.length === 0) {
      projects.value = [
        {
          id: '1',
          title: 'Modern Coffee Table',
          description: 'Build a stylish coffee table with a minimalist design.',
          images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBw0fuVo3NIGJOwYFZaw6_GpKGqP2veWRA6k4w35fUELRpyNUFSE_hhtU3KOtuGumkDa8uaYw-nwcXvDT0OaunDwep3rmOxwwqKe6zCGqyrxxs2I5Qm2IY1TVs8wRb7A2XCE1SAPcJ9ahdOP-rd5_1LRkmlPAqrlgamJuCuz9JXUUkORg4tvb2oHd3YPSJvQWUzt9PfnVWYhgNArTS3MExdbc1Oug3rgv6Hvl4mlbyVoZgmFvwo5OHcOb9H2N50TMU0DtQKYL_rDM4n'],
          tags: ['furniture', 'modern'],
          difficulty: 'Medium',
          created_at: '2024-01-01',
          published: true,
          user_id: '1'
        },
        {
          id: '2',
          title: 'Handcrafted Wooden Toys',
          description: 'Create fun and safe wooden toys for children.',
          images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCYmgIsCWUCY32SH6SRcZvDpHRvmQfIiaPLVNv385kHlzCHi6dnO47G-6vE5Baz4VPBjHtvKClyXJ7V4i1hgJhyQswEDTCIn2ZF7LRSLvsHsHfmSK9RD2-fJGE2WBF4b4nY2vMaWBwLLj0prOyl_DLogiIwxm__oYptM5p-XDlbiRLhEJCDcCFxyMa6rUjLMcVnlGodZvfOWI6aHXvV1eIXYUAb1Z4-7xKKeCRccgACRBIcvIEvGkV3HtauaNJZVsIeIM2XgOYitRw_'],
          tags: ['toys', 'kids'],
          difficulty: 'Easy',
          created_at: '2024-01-02',
          published: true,
          user_id: '1'
        },
        {
          id: '3',
          title: 'Rustic Wall Decor',
          description: 'Add a touch of rustic charm to your home with this wall decor.',
          images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuD2ccc_ERGfYP2ZBo8-NPevpNskT4kCaVk4kqL326E-JKeNIo5TayKOQVh7i_8ThQoWCy0HB3EJ-ScS5TIVpgD_5ymvlHBY_YLb9_xkeuQZCFAFtaFXJLLSJrdN9N_KK171gF6jTgrzaiwoCmOI_YGaKdybgNmjfXwkG6R6L1DZ565iu3ltznHnIcywRLVpIVSFrn2jfI2Eco6TVotbPMxgcSV0E5v3rb1kr7rd_2SlKVGR7l_jY9a4NoLYc3AuF9TZBbXaJbHEMM3q'],
          tags: ['decor', 'rustic'],
          difficulty: 'Easy',
          created_at: '2024-01-03',
          published: true,
          user_id: '1'
        },
        {
          id: '4',
          title: 'Outdoor Bench',
          description: 'Construct a durable and comfortable outdoor bench.',
          images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCMwu5Js5-8JN1Ros8SwUIyLSeuA4WlI9OyISczU-ohZb37gr9CDF1ttLqk1ksciZwRFxqi6oUPcnH3DMFaDzjX3-iZR8nceF3HW-fEqvgn7BDu2eiP3roWtHdx8qqBiSFnY25mxT6NYVXqfMOGuWFU5U9upHoY99uvBlG4dHT-Z0fZEzMq7pwvY_t7cpmQZELQFd2JdcE301AqGf8nHjWpCyM85ZWSf8nX4pUUIOHOrc_YtwE2haPeRM4cQC8qTF6tutaF4rrz_9tJ'],
          tags: ['outdoor', 'furniture'],
          difficulty: 'Medium',
          created_at: '2024-01-04',
          published: true,
          user_id: '1'
        }
      ]
    }

    if (projects.value.length > 0) {
      const randomIndex = Math.floor(Math.random() * projects.value.length)
      spotlightProject.value = projects.value[randomIndex]
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Fallback to sample data on error
    projects.value = [
      {
        id: '1',
        title: 'Handcrafted Wooden Desk',
        description: 'This project features a beautifully crafted wooden desk, perfect for a home office or study.',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCcfwoKySRC2P67wBwhe2gfWzPVN7yxUOS-puZx1GdR__zulfKKpENQQMBphphoTp3boSvDHr7j36uBmOiIM_TDWe0zCtuHZGB4uCHowS7scfwMPkXKE79FQsmPeJC02an63ue1QSVX9fWEjmOVyvNY6BnjBOHE-yEoISvcDkm1SKv3uMCkgtYaU-DDb8MnCsh_H1mxKt5ZW-dwZY7Jzf01--8zUl8tVEt044iu71iVETytqoViLEuC9F9PlY_ZMqreKqpB_0NBXRu4'],
        tags: ['furniture', 'office'],
        difficulty: 'Hard',
        created_at: '2024-01-01',
        published: true,
        user_id: '1'
      }
    ]
    spotlightProject.value = projects.value[0]
  } finally {
    loading.value = false
  }
}

const handleSearch = (query: string) => {
  searchQuery.value = query
}

onMounted(fetchProjects)
</script>

<template>
  <div class="px-40 flex flex-1 justify-center py-5 bg-white">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      <ProjectSpotlight :project="spotlightProject" />

      <div class="px-4 py-3">
        <SearchBar @search="handleSearch" />
      </div>

      <div class="flex gap-3 p-3 flex-wrap pr-4">
        <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f1f2f4] pl-4 pr-4">
          <p class="text-[#121416] text-sm font-medium leading-normal">Furniture</p>
        </div>
        <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f1f2f4] pl-4 pr-4">
          <p class="text-[#121416] text-sm font-medium leading-normal">Decor</p>
        </div>
        <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f1f2f4] pl-4 pr-4">
          <p class="text-[#121416] text-sm font-medium leading-normal">Toys</p>
        </div>
        <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f1f2f4] pl-4 pr-4">
          <p class="text-[#121416] text-sm font-medium leading-normal">Outdoor</p>
        </div>
        <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f1f2f4] pl-4 pr-4">
          <p class="text-[#121416] text-sm font-medium leading-normal">Kitchen</p>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#121416]"></div>
      </div>

      <div v-else-if="filteredProjects.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-[#6a7681]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-[#121416]">No projects found</h3>
        <p class="mt-1 text-sm text-[#6a7681]">
          {{ searchQuery ? 'Try adjusting your search terms.' : 'Be the first to share a project!' }}
        </p>
      </div>

      <div v-else>
        <h2 class="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          {{ searchQuery ? `Search Results (${filteredProjects.length})` : 'Featured Projects' }}
        </h2>

        <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
          />
        </div>
      </div>
    </div>
  </div>
</template>
