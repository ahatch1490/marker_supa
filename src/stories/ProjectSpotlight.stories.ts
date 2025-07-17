import type { Meta, StoryObj } from '@storybook/vue3'
import ProjectSpotlight from '../components/ProjectSpotlight.vue'
import type { Project } from '../lib/supabase'

const meta: Meta<typeof ProjectSpotlight> = {
  title: 'Components/ProjectSpotlight',
  component: ProjectSpotlight,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const spotlightProject: Project = {
  id: 'spotlight-1',
  user_id: 'user-456',
  title: 'Smart Home Automation System',
  description: 'A comprehensive home automation system built with IoT devices, featuring voice control, mobile app integration, and energy monitoring. Control lights, temperature, security cameras, and more from anywhere in the world.',
  difficulty: 'Hard',
  images: ['https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Smart+Home+System'],
  tags: ['iot', 'smart-home', 'automation', 'voice-control', 'mobile-app'],
  published: true,
  created_at: '2024-01-20T14:00:00Z',
  updated_at: '2024-01-20T14:00:00Z'
}

export const Default: Story = {
  args: {
    project: spotlightProject
  }
}

export const WithoutImage: Story = {
  args: {
    project: {
      ...spotlightProject,
      images: []
    }
  }
}

export const EasyProject: Story = {
  args: {
    project: {
      ...spotlightProject,
      title: 'Simple LED Blinker',
      description: 'Learn the basics of electronics with this simple LED blinking circuit. Perfect first project for beginners.',
      difficulty: 'Easy',
      tags: ['beginner', 'led', 'electronics'],
      images: ['https://via.placeholder.com/600x400/10B981/FFFFFF?text=LED+Blinker']
    }
  }
}

export const MediumProject: Story = {
  args: {
    project: {
      ...spotlightProject,
      title: 'Arduino Temperature Monitor',
      description: 'Build a temperature monitoring system with data logging and alert notifications using Arduino and sensors.',
      difficulty: 'Medium',
      tags: ['arduino', 'sensors', 'monitoring'],
      images: ['https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Temperature+Monitor']
    }
  }
}

export const NoProject: Story = {
  args: {
    project: null
  }
}

export const ManyTags: Story = {
  args: {
    project: {
      ...spotlightProject,
      tags: ['iot', 'smart-home', 'automation', 'voice-control', 'mobile-app', 'sensors', 'raspberry-pi', 'python', 'javascript', 'react']
    }
  }
}