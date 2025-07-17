<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Tags
    </label>
    
    <div class="flex flex-wrap gap-2 mb-2">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
      >
        {{ tag }}
        <button
          type="button"
          @click="removeTag(index)"
          class="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-600 hover:bg-blue-200 hover:text-blue-800"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </span>
    </div>
    
    <div class="flex">
      <input
        v-model="newTag"
        type="text"
        placeholder="Add a tag..."
        maxlength="20"
        class="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        @keyup.enter="addTag"
        @keyup.comma.prevent="addTag"
      />
      <button
        type="button"
        @click="addTag"
        :disabled="!canAddTag"
        class="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add
      </button>
    </div>
    
    <p class="mt-1 text-xs text-gray-500">
      Press Enter or comma to add tags. Max 20 characters per tag.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [tags: string[]]
}>()

const tags = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const newTag = ref('')

const canAddTag = computed(() => {
  const trimmed = newTag.value.trim()
  return trimmed.length > 0 && 
         trimmed.length <= 20 && 
         !tags.value.includes(trimmed)
})

const addTag = () => {
  if (!canAddTag.value) return
  
  const trimmed = newTag.value.trim()
  tags.value = [...tags.value, trimmed]
  newTag.value = ''
}

const removeTag = (index: number) => {
  tags.value = tags.value.filter((_, i) => i !== index)
}
</script>