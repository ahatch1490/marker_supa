import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'
import '../src/assets/main.css'

// Setup global components for Storybook
setup((app) => {
  // Mock router-link component for Storybook
  app.component('RouterLink', {
    props: ['to'],
    template: '<a :href="to" @click.prevent="onClick"><slot /></a>',
    methods: {
      onClick() {
        console.log('Navigate to:', this.to)
      }
    }
  })
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;