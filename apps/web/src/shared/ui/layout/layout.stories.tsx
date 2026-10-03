import type { Meta, StoryObj } from '@storybook/react'
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { Layout } from './layout'

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <p>Conteúdo do Dashboard</p>,
})

const listRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/list',
  component: () => <p>Conteúdo da List</p>,
})

const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, listRoute]),
  history: createMemoryHistory({
    initialEntries: ['/'],
  }),
})

const meta = {
  title: 'Shared/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Layout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <RouterProvider router={router} />,
}
