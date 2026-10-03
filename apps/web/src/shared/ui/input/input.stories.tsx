import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta = {
  title: 'Shared/Input',
  component: Input,
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Year: Story = {
  args: {
    type: 'number',
    placeholder: 'Search by year',
    'aria-label': 'Filter by year',
  },
}
