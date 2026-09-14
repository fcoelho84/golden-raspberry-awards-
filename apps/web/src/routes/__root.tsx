import { Outlet, createRootRoute } from '@tanstack/react-router'
import '@/main.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from '#/shared/ui/layout/layout'

export const Route = createRootRoute({
  component: RootComponent,
})

const queryClient = new QueryClient()

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen flex-col overflow-hidden">
        <Layout>
          <main className="flex-1 overflow-y-auto p-8">
            <Outlet />
          </main>
        </Layout>
      </div>
    </QueryClientProvider>
  )
}
