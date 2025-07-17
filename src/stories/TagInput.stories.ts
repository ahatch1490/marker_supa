import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import TagInput from '../components/TagInput.vue'

const meta: Meta<typeof TagInput> = {
  title: 'Components/TagInput',
  component: TagInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    'onUpdate:modelValue': { action: 'update:modelValue' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    modelValue: []
  }
}

export const WithTags: Story = {
  args: {
    modelValue: ['javascript', 'vue', 'frontend']
  }
}

export const ManyTags: Story = {
  args: {
    modelValue: ['javascript', 'vue', 'frontend', 'backend', 'nodejs', 'api', 'database', 'mongodb']
  }
}

export const Interactive: Story = {
  render: (args) => ({
    components: { TagInput },
    setup() {
      const tags = ref(['existing', 'tags'])
      return { args, tags }
    },
    template: '<TagInput v-model="tags" />'
  })
}

export const SingleTag: Story = {
  args: {
    modelValue: ['single-tag']
  }
}

export const LongTagNames: Story = {
  args: {
    modelValue: ['very-long-tag-name', 'another-extremely-long-tag', 'short']
  }
}