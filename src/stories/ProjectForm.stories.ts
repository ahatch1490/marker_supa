import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import ProjectForm from '../components/ProjectForm.vue'
import type { Project } from '../lib/supabase'

const meta: Meta<typeof ProjectForm> = {
  title: 'Components/ProjectForm',
  component: ProjectForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submit' },
    onCancel: { action: 'cancel' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const CreateNew: Story = {
  args: {
    project: null,
    isEdit: false
  }
}

export const EditExisting: Story = {
  args: {
    project: {
      id: 'edit-project',
      user_id: 'user-123',
      title: 'Arduino Moisture Sensor',
      description: 'A soil moisture monitoring system for plants using Arduino and sensors. Includes automatic watering capabilities.',
      difficulty: 'Medium',
      images: ['https://via.placeholder.com/300x200/059669/FFFFFF?text=Moisture+Sensor'],
      tags: ['arduino', 'sensors', 'gardening', 'automation'],
      published: true,
      created_at: '2024-01-10T09:00:00Z',
      updated_at: '2024-01-15T11:30:00Z'
    } as Project,
    isEdit: true
  }
}

export const WithMultipleImages: Story = {
  args: {
    project: {
      id: 'multi-image-project',
      user_id: 'user-456',
      title: 'Raspberry Pi Robot Car',
      description: 'Build a remote-controlled robot car with camera streaming and obstacle avoidance.',
      difficulty: 'Hard',
      images: [
        'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Robot+Car+1',
        'https://via.placeholder.com/300x200/059669/FFFFFF?text=Robot+Car+2',
        'https://via.placeholder.com/300x200/2563EB/FFFFFF?text=Robot+Car+3'
      ],
      tags: ['raspberry-pi', 'robotics', 'python', 'opencv'],
      published: false,
      created_at: '2024-01-05T15:20:00Z',
      updated_at: '2024-01-12T08:45:00Z'
    } as Project,
    isEdit: true
  }
}

export const Interactive: Story = {
  render: (args) => ({
    components: { ProjectForm },
    setup() {
      const handleSubmit = (data: any) => {
        console.log('Form submitted:', data)
        alert(`Project "${data.title}" submitted successfully!`)
      }
      
      const handleCancel = () => {
        console.log('Form cancelled')
        alert('Form cancelled')
      }
      
      return { args, handleSubmit, handleCancel }
    },
    template: '<ProjectForm v-bind="args" @submit="handleSubmit" @cancel="handleCancel" />'
  })
}

export const WithValidationErrors: Story = {
  render: (args) => ({
    components: { ProjectForm },
    setup() {
      const handleSubmit = () => {
        // Simulate validation error
        throw new Error('Title must be at least 5 characters long')
      }
      
      const handleCancel = () => {
        console.log('Form cancelled')
      }
      
      return { args, handleSubmit, handleCancel }
    },
    template: '<ProjectForm v-bind="args" @submit="handleSubmit" @cancel="handleCancel" />'
  })
}