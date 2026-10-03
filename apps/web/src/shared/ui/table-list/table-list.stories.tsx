import type { Meta, StoryObj } from '@storybook/react'
import { TableList } from './table-list'

const meta = {
  title: 'Shared/TableList',
  component: TableList,
} satisfies Meta<typeof TableList>

export default meta

type Story = StoryObj<typeof meta>

export const Header: Story = {
  args: {
    columns: ['Producer', 'Interval', 'Previous year', 'Following year'],
    className: 'font-bold bg-white grid-cols-4',
  },
}
