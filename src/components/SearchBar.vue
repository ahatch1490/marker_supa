<template>
  <label class="flex flex-col min-w-40 h-12 w-full">
    <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
      <div
        class="text-[#6a7681] flex border-none bg-[#f1f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0"
        data-icon="MagnifyingGlass"
        data-size="24px"
        data-weight="regular"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path
            d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
          ></path>
        </svg>
      </div>
      <input
        v-model="searchQuery"
        class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-full placeholder:text-[#6a7681] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
        placeholder="Search projects by title or tags..."
        @input="$emit('search', searchQuery)"
      />
      <div v-if="searchQuery" class="flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#f1f2f4] pr-2 pr-4">
        <button
          @click="clearSearch"
          class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-transparent text-[#121416] gap-2 text-base font-bold leading-normal tracking-[0.015em] h-auto min-w-0 px-0"
        >
          <div class="text-[#6a7681]" data-icon="XCircle" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path
                d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits<{
  search: [query: string]
}>()

const clearSearch = () => {
  searchQuery.value = ''
  emit('search', '')
}
</script>