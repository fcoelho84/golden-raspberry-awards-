import { ListFilters } from '#/fatures/movie-list/components/list-filters/list-filters'
import { ListNavigation } from '#/fatures/movie-list/components/list-navigation/list-navigation'
import { List } from '#/fatures/movie-list/components/list/list'
import { createFileRoute } from '@tanstack/react-router'

const RouteComponent = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <ListFilters />
      <List />
      <ListNavigation />
    </div>
  )
}

export const Route = createFileRoute('/list')({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      page: search.page || 1,
      size: search.size || 10,
    }
  },
})
