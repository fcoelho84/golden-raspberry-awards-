import { TableList } from '#/shared/ui/table-list/table-list'
import { Loader } from '#/shared/ui/loader/loader'
import { useStudioWinCount } from '../../api/use-studio-win-count'

export const StudioWinCount = () => {
  const response = useStudioWinCount()
  if (response.isLoading) {
    return (
      <div className="max-w-fit border border-slate-200 rounded-md overflow-hidden">
        <TableList
          columns={['Year', 'Win Count']}
          className="font-bold bg-white grid-cols-[256px_128px]"
        />
        <Loader />
      </div>
    )
  }

  const data = response.data?.data.studios || []

  return (
    <div className="flex gap-2 flex-col">
      <h2 className="font-bold">Top 3 studios with winners</h2>
      <div className="max-w-fit border border-slate-200 rounded-md overflow-hidden">
        <TableList
          columns={['Year', 'Win Count']}
          className="font-bold bg-white grid-cols-[256px_128px]"
        />
        {data.slice(0, 3).map((studio, i) => (
          <TableList
            key={i}
            columns={[studio.name, String(studio.winCount)]}
            className="last:border-b-0 grid-cols-[256px_128px]"
          />
        ))}
      </div>
    </div>
  )
}
