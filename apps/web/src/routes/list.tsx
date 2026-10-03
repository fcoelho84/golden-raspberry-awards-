import { ListFilters } from '#/modules/movie-list/components/list-filters/list-filters'
import { ListNavigation } from '#/modules/movie-list/components/list-navigation/list-navigation'
import { List } from '#/modules/movie-list/components/list/list'
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
    const page = Number(search.page)
    const size = Number(search.size)
    const year = Number(search.year)
    const validated: {
      page: number
      size: number
      year?: number
      winner?: boolean
    } = {
      page: Number.isInteger(page) && page >= 0 ? page : 0,
      size: Number.isInteger(size) && size > 0 ? size : 10,
    }

    if (Number.isInteger(year)) validated.year = year
    if (search.winner === true || search.winner === 'true') validated.winner = true
    if (search.winner === false || search.winner === 'false') {
      validated.winner = false
    }

    return validated
  },
})
