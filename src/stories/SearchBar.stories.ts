import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSearch: { action: 'search' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const WithPlaceholder: Story = {
  args: {},
  render: (args) => ({
    components: { SearchBar },
    setup() {
      const handleSearch = (query: string) => {
        console.log('Search query:', query)
      }
      return { args, handleSearch }
    },
    template: '<SearchBar v-bind="args" @search="handleSearch" />'
  })
}

export const Interactive: Story = {
  args: {},
  render: (args) => ({
    components: { SearchBar },
    setup() {
      const searchResults = ref<string[]>([])
      const handleSearch = (query: string) => {
        // Simulate search results
        if (query.length > 0) {
          searchResults.value = [
            `Results for "${query}"`,
            `Found projects matching: ${query}`,
            `Searching in tags: ${query}`
          ]
        } else {
          searchResults.value = []
        }
      }
      return { args, handleSearch, searchResults }
    },
    template: `
      <div class="space-y-4">
        <SearchBar v-bind="args" @search="handleSearch" />
        <div v-if="searchResults.length > 0" class="text-sm text-gray-600">
          <div v-for="result in searchResults" :key="result">{{ result }}</div>
        </div>
      </div>
    `
  })
}