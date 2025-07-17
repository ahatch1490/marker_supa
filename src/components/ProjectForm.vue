<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="title" class="block text-sm font-medium text-red-100" >
        Project Title
      </label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Enter project title..."
      />
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="description"
        v-model="form.description"
        rows="4"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Describe your project..."
      />
    </div>

    <div>
      <label for="difficulty" class="block text-sm font-medium text-gray-700">
        Difficulty Level
      </label>
      <select
        id="difficulty"
        v-model="form.difficulty"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Select difficulty...</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>

    <TagInput v-model="form.tags" />

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Project Images
      </label>

      <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
        <div class="space-y-1 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="flex text-sm text-gray-600">
            <label for="images" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
              <span>Upload images</span>
              <input
                id="images"
                ref="fileInput"
                type="file"
                multiple
                accept="image/*"
                class="sr-only"
                @change="handleFileSelect"
              />
            </label>
            <p class="pl-1">or drag and drop</p>
          </div>
          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
        </div>
      </div>

      <div v-if="selectedFiles.length > 0" class="mt-4">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Selected Images:</h4>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div
            v-for="(file, index) in selectedFiles"
            :key="index"
            class="relative group"
          >
            <img
              :src="file.preview"
              :alt="`Preview ${index + 1}`"
              class="w-full h-24 object-cover rounded-lg"
            />
            <button
              type="button"
              @click="removeFile(index)"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <div v-if="existingImages.length > 0" class="mt-4">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Current Images:</h4>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div
            v-for="(image, index) in existingImages"
            :key="index"
            class="relative group"
          >
            <img
              :src="image"
              :alt="`Current ${index + 1}`"
              class="w-full h-24 object-cover rounded-lg"
            />
            <button
              type="button"
              @click="removeExistingImage(index)"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <input
        id="published"
        v-model="form.published"
        type="checkbox"
        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label for="published" class="ml-2 block text-sm text-gray-900">
        Publish this project (make it visible to everyone)
      </label>
    </div>

    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {{ loading ? 'Saving...' : (isEdit ? 'Update Project' : 'Create Project') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import TagInput from './TagInput.vue'
import { uploadImage } from '../lib/imageUtils'
import type { Project } from '../lib/supabase'

interface FileWithPreview {
  file: File
  preview: string
}

const props = defineProps<{
  project?: Project | null
  isEdit?: boolean
}>()

const emit = defineEmits<{
  submit: [data: Partial<Project>]
  cancel: []
}>()

const form = reactive({
  title: '',
  description: '',
  difficulty: '' as 'Easy' | 'Medium' | 'Hard' | '',
  tags: [] as string[],
  published: false
})

const selectedFiles = ref<FileWithPreview[]>([])
const existingImages = ref<string[]>([])
const loading = ref(false)
const error = ref('')
const fileInput = ref<HTMLInputElement>()

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files) return

  Array.from(files).forEach(file => {
    if (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
      const reader = new FileReader()
      reader.onload = (e) => {
        selectedFiles.value.push({
          file,
          preview: e.target?.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  })

  if (fileInput.value) fileInput.value.value = ''
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const removeExistingImage = (index: number) => {
  existingImages.value.splice(index, 1)
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''

    const imageUrls = [...existingImages.value]

    for (const { file } of selectedFiles.value) {
      const url = await uploadImage(file)
      imageUrls.push(url)
    }

    const projectData = {
      title: form.title,
      description: form.description,
      difficulty: form.difficulty as 'Easy' | 'Medium' | 'Hard',
      tags: form.tags,
      published: form.published,
      images: imageUrls
    }

    emit('submit', projectData)

  } catch (err: any) {
    error.value = err.message || 'Failed to save project'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (props.project) {
    form.title = props.project.title
    form.description = props.project.description
    form.difficulty = props.project.difficulty
    form.tags = [...props.project.tags]
    form.published = props.project.published
    existingImages.value = [...props.project.images]
  }
})
</script>
