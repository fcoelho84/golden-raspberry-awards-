import { TableList } from '#/shared/ui/table-list/table-list'
import { Loader } from '#/shared/ui/loader/loader'
import { useShortestLongestInterval } from '../../api/use-shortest-longest-interval'

export const ShortestLongestInterval = () => {
  const response = useShortestLongestInterval()

  if (response.isLoading) {
    return (
      <div className="max-w-fit border border-slate-200 rounded-md overflow-hidden">
        <Loader />
      </div>
    )
  }

  const min = response.data?.data.min || []
  const max = response.data?.data.min || []

  return (
    <div className="flex gap-2 flex-col">
      <h2 className="font-bold">
        Producers with longest and shortest interval between wins
      </h2>

      <h3>Maximum</h3>

      <div className="max-w-fit border border-slate-200 rounded-md overflow-hidden">
        <TableList
          columns={['Producer', 'Interval', 'Previous year', 'Following year']}
          className="font-bold bg-white grid-cols-[258px_96px_160px_160px]"
        />

        {min.map((movie, i) => (
          <TableList
            key={i}
            columns={[
              movie.producer,
              String(movie.interval),
              String(movie.previousWin),
              String(movie.previousWin),
            ]}
            className="last:border-b-0 grid-cols-[258px_96px_160px_160px]"
          />
        ))}
      </div>

      <h3>Minimum</h3>

      <div className="max-w-fit border border-slate-200 rounded-md overflow-hidden">
        <TableList
          columns={['Producer', 'Interval', 'Previous year', 'Following year']}
          className="font-bold bg-white grid-cols-[258px_96px_160px_160px]"
        />

        {max.map((movie, i) => (
          <TableList
            key={i}
            columns={[
              movie.producer,
              String(movie.interval),
              String(movie.previousWin),
              String(movie.previousWin),
            ]}
            className="last:border-b-0 grid-cols-[258px_96px_160px_160px]"
          />
        ))}
      </div>
    </div>
  )
}
