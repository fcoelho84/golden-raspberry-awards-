import { TableList } from '#/shared/ui/table-list/table-list'
import { Loader } from '#/shared/ui/loader/loader'
import { useMovies } from '../../api/use-movies'

export const List = () => {
  const response = useMovies()

  if (response.isLoading) {
    return (
      <div className="min-w-full border border-slate-200 rounded-md overflow-hidden">
        <TableList
          columns={['ID', 'Year', 'Title', 'Winner']}
          className="font-bold bg-white grid-cols-[96px_96px_auto_128px]"
        />
        <Loader />
      </div>
    )
  }

  const data = response.data?.data.content || []

  return (
    <div className="min-w-full border border-slate-200 rounded-md overflow-hidden">
      <TableList
        columns={['ID', 'Year', 'Title', 'Winner']}
        className="font-bold bg-white grid-cols-[96px_96px_auto_128px]"
      />

      {data.map((movie, i) => (
        <TableList
          key={i}
          columns={[
            String(movie.id),
            String(movie.year),
            movie.title,
            movie.winner ? 'Yes' : 'No',
          ]}
          className="last:border-b-0 grid-cols-[96px_96px_auto_128px]"
        />
      ))}
    </div>
  )
}
