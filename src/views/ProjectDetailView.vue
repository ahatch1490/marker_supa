<template>
  <div v-if="loading" class="flex justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>

  <div v-else-if="!project" class="max-w-2xl mx-auto px-4 py-12 text-center">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
    <p class="text-gray-600 mb-8">The project you're looking for doesn't exist or is not published.</p>
    <router-link
      to="/"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
    >
      ← Back to Home
    </router-link>
  </div>

  <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <router-link
        to="/"
        class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </router-link>

      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">{{ project.title }}</h1>
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
          :class="difficultyClasses[project.difficulty]"
        >
          {{ project.difficulty }}
        </span>
      </div>

      <p class="mt-2 text-sm text-gray-500">
        Created {{ formatDate(project.created_at) }}
      </p>
    </div>

    <div v-if="project.images.length > 0" class="mb-8">
      <div v-if="project.images.length === 1" class="w-full">
        <img
          :src="project.images[0]"
          :alt="project.title"
          class="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          v-for="(image, index) in project.images"
          :key="index"
          :src="image"
          :alt="`${project.title} - Image ${index + 1}`"
          class="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          @click="openImageModal(image)"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <div class="prose prose-blue max-w-none">
            <p class="text-gray-700 whitespace-pre-wrap">{{ project.description }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
          <dl class="space-y-4">
            <div>
              <dt class="text-sm font-medium text-gray-500">Difficulty</dt>
              <dd class="mt-1">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  :class="difficultyClasses[project.difficulty]"
                >
                  {{ project.difficulty }}
                </span>
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Created</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ formatDate(project.created_at) }}</dd>
            </div>
            <div v-if="project.updated_at !== project.created_at">
              <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ formatDate(project.updated_at) }}</dd>
            </div>
          </dl>
        </div>

        <div v-if="project.tags.length > 0" class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showImageModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      @click="closeImageModal"
    >
      <div class="max-w-4xl max-h-full">
        <img
          :src="modalImage"
          alt="Full size view"
          class="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabase'
import type { Project } from '../lib/supabase'

const route = useRoute()


const project = ref<Project | null>(null)
const loading = ref(true)
const showImageModal = ref(false)
const modalImage = ref('')

const difficultyClasses = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800'
}

const fetchProject = async () => {
  try {
    const projectId = route.params.id as string

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('published', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        project.value = null
      } else {
        throw error
      }
    } else {
      project.value = data
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    project.value = null
  } finally {
    loading.value = false
  }
}

const openImageModal = (image: string) => {
  modalImage.value = image
  showImageModal.value = true
}

const closeImageModal = () => {
  showImageModal.value = false
  modalImage.value = ''
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}


onMounted(fetchProject)
</script>
