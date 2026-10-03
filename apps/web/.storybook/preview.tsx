import '#/main.css'

import type { Preview } from '@storybook/react'

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-slate-50 p-6">
        <Story />
      </div>
    ),
  ],
}

export default preview
