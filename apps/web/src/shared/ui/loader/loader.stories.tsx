import type { Meta, StoryObj } from '@storybook/react'
import { Loader } from './loader'

const meta = {
  title: 'Shared/Loader',
  component: Loader,
} satisfies Meta<typeof Loader>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
