import type { Meta, StoryObj } from '@storybook/vue3'
import ProjectCard from '../components/ProjectCard.vue'
import type { Project } from '../lib/supabase'

const meta: Meta<typeof ProjectCard> = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const mockProject: Project = {
  id: '1',
  user_id: 'user-123',
  title: 'Arduino LED Matrix Display',
  description: 'A fun project to create an 8x8 LED matrix display controlled by an Arduino. Perfect for beginners wanting to learn about electronics and programming.',
  difficulty: 'Easy',
  images: ['https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Arduino+LED+Matrix'],
  tags: ['arduino', 'electronics', 'beginner', 'led'],
  published: true,
  created_at: '2024-01-15T10:30:00Z',
  updated_at: '2024-01-15T10:30:00Z'
}

export const Default: Story = {
  args: {
    project: mockProject
  }
}

export const WithoutImage: Story = {
  args: {
    project: {
      ...mockProject,
      images: []
    }
  }
}

export const MediumDifficulty: Story = {
  args: {
    project: {
      ...mockProject,
      title: 'Raspberry Pi Weather Station',
      description: 'Build a complete weather monitoring system using Raspberry Pi, sensors, and a web interface to display real-time weather data.',
      difficulty: 'Medium',
      tags: ['raspberry-pi', 'python', 'sensors', 'web'],
      images: ['https://via.placeholder.com/400x300/059669/FFFFFF?text=Weather+Station']
    }
  }
}

export const HardDifficulty: Story = {
  args: {
    project: {
      ...mockProject,
      title: 'AI-Powered Robot Navigation',
      description: 'Advanced robotics project implementing machine learning for autonomous navigation and obstacle avoidance in complex environments.',
      difficulty: 'Hard',
      tags: ['ai', 'robotics', 'machine-learning', 'opencv'],
      images: ['https://via.placeholder.com/400x300/DC2626/FFFFFF?text=AI+Robot']
    }
  }
}

export const LongDescription: Story = {
  args: {
    project: {
      ...mockProject,
      description: 'This is a very long description that should be truncated in the card view. It contains multiple sentences and detailed information about the project, its goals, implementation details, and expected outcomes. This helps test how the component handles text overflow and truncation.',
      tags: ['long-description', 'test', 'ui', 'truncation', 'overflow']
    }
  }
}

export const ManyTags: Story = {
  args: {
    project: {
      ...mockProject,
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8']
    }
  }
}