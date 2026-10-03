import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './select'

const meta = {
  title: 'Shared/Select',
  component: Select,
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Winner: Story = {
  render: (args) => (
    <Select {...args}>
      <option value="">All</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </Select>
  ),
}
