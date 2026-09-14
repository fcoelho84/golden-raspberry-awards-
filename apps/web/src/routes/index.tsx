import { MovieWinCount } from '#/modules/dashboard/components/movie-win-count/movie-win-count'
import { SearchByYear } from '#/modules/dashboard/components/search-by-year/search-by-year'
import { ShortestLongestInterval } from '#/modules/dashboard/components/shortest-longest-interval/shortest-longest-interval'
import { StudioWinCount } from '#/modules/dashboard/components/studio-win-count/studio-win-count'
import { createFileRoute } from '@tanstack/react-router'

function RouteComponent() {
  return (
    <div className="flex gap-8 flex-wrap">
      <div className="flex gap-8 min-w-full items-start justify-start flex-wrap">
        <MovieWinCount />
        <StudioWinCount />
        <SearchByYear />
      </div>
      <div className="flex gap-8 min-w-full items-start justify-start flex-wrap">
        <ShortestLongestInterval />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      year: (search.year as number) || 2000,
    }
  },
})
