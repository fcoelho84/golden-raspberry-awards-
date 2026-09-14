import { TableList } from '#/shared/ui/table-list/table-list'
import { Loader } from '#/shared/ui/loader/loader'
import { useMovieWinCount } from '../../api/use-movie-win-count'

export const MovieWinCount = () => {
  const response = useMovieWinCount()

  if (response.isLoading) {
    return (
      <div className="max-w-fit border border-slate-200 rounded-md overflow-hidden">
        <TableList
          columns={['Year', 'Win Count']}
          className="font-bold bg-white grid-cols-[128px_128px]"
        />
        <Loader />
      </div>
    )
  }

  const data = response.data?.data.years || []

  return (
    <div className="flex gap-2 flex-col">
      <h2 className="font-bold">List years with multiple winners</h2>
      <div className="max-w-fit border border-slate-200 rounded-md overflow-hidden">
        <TableList
          columns={['Year', 'Win Count']}
          className="font-bold bg-white grid-cols-[128px_128px]"
        />

        {data.map((movie, i) => (
          <TableList
            key={i}
            columns={[String(movie.year), String(movie.winnerCount)]}
            className="last:border-b-0 grid-cols-[128px_128px]"
          />
        ))}
      </div>
    </div>
  )
}
