<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">My Projects</h1>
        <p class="mt-2 text-sm text-gray-700">
          Manage your woodworking project portfolio
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          @click="showForm = true"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Project
        </button>
      </div>
    </div>

    <div v-if="showForm" class="mb-8 bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        {{ editingProject ? 'Edit Project' : 'Create New Project' }}
      </h2>
      <ProjectForm
        :project="editingProject"
        :is-edit="!!editingProject"
        @submit="handleFormSubmit"
        @cancel="cancelForm"
      />
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="projects.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No projects yet</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by creating your first project.</p>
      <div class="mt-6">
        <button
          @click="showForm = true"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Project
        </button>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
      >
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900 truncate">{{ project.title }}</h3>
            <span
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              :class="project.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
            >
              {{ project.published ? 'Published' : 'Draft' }}
            </span>
          </div>
          
          <p class="text-sm text-gray-600 mb-4 line-clamp-3">{{ project.description }}</p>
          
          <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>{{ project.difficulty }}</span>
            <span>{{ formatDate(project.created_at) }}</span>
          </div>
          
          <div class="flex flex-wrap gap-1 mb-4">
            <span
              v-for="tag in project.tags.slice(0, 3)"
              :key="tag"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
            >
              #{{ tag }}
            </span>
            <span v-if="project.tags.length > 3" class="text-gray-500 text-xs">
              +{{ project.tags.length - 3 }}
            </span>
          </div>
        </div>
        
        <div class="px-4 py-4 sm:px-6">
          <div class="flex justify-between">
            <div class="flex space-x-2">
              <button
                @click="editProject(project)"
                class="text-blue-600 hover:text-blue-900 text-sm font-medium"
              >
                Edit
              </button>
              <button
                @click="togglePublish(project)"
                class="text-green-600 hover:text-green-900 text-sm font-medium"
              >
                {{ project.published ? 'Unpublish' : 'Publish' }}
              </button>
            </div>
            <button
              @click="deleteProject(project)"
              class="text-red-600 hover:text-red-900 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import type { Project } from '../lib/supabase'
import ProjectForm from '../components/ProjectForm.vue'

const projects = ref<Project[]>([])
const loading = ref(true)
const showForm = ref(false)
const editingProject = ref<Project | null>(null)

const fetchProjects = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    projects.value = data || []
  } catch (error) {
    console.error('Error fetching projects:', error)
  } finally {
    loading.value = false
  }
}

const handleFormSubmit = async (data: Partial<Project>) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (editingProject.value) {
      const { error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', editingProject.value.id)

      if (error) throw error
    } else {
      const { error } = await supabase
        .from('projects')
        .insert([{ ...data, user_id: user.id }])

      if (error) throw error
    }

    await fetchProjects()
    cancelForm()
  } catch (error) {
    console.error('Error saving project:', error)
  }
}

const editProject = (project: Project) => {
  editingProject.value = project
  showForm.value = true
}

const togglePublish = async (project: Project) => {
  try {
    const { error } = await supabase
      .from('projects')
      .update({ published: !project.published })
      .eq('id', project.id)

    if (error) throw error
    await fetchProjects()
  } catch (error) {
    console.error('Error toggling publish status:', error)
  }
}

const deleteProject = async (project: Project) => {
  if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
    return
  }

  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', project.id)

    if (error) throw error
    await fetchProjects()
  } catch (error) {
    console.error('Error deleting project:', error)
  }
}

const cancelForm = () => {
  showForm.value = false
  editingProject.value = null
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

onMounted(fetchProjects)
</script>