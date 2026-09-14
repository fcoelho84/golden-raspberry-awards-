import { useDebounce } from '#/shared/hooks/useDebounce'
import { Input } from '#/shared/ui/input/input'
import { Select } from '#/shared/ui/select/select'
import { useNavigate } from '@tanstack/react-router'

type Params = {
  year?: number
  winner?: boolean
}

export const ListFilters = () => {
  const navigate = useNavigate({ from: '/list' })
  const debounce = useDebounce()

  const handleFilter = (params: Params) => {
    navigate({
      search: (prev) => ({ page: 1, size: prev.size, ...params }),
    })
  }

  const handleYearChange = (value: string) => {
    const parsedYear = parseInt(value, 10)
    handleFilter({ year: Number.isNaN(parsedYear) ? undefined : parsedYear })
  }

  const handleWinnerChange = (value: string) => {
    handleFilter({ winner: value === '' ? undefined : value === 'true' })
  }

  return (
    <div className="flex items-center text-sm text-slate-600 gap-4 min-w-full">
      <span className="flex gap-1 flex-col font-bold">
        <label htmlFor="year-filter">Search by year</label>
        <Input
          id="year-filter"
          type="number"
          aria-label="Filter by year"
          onChange={(event) =>
            debounce(() => handleYearChange(event.target.value))
          }
        />
      </span>
      <span className="flex flex-col gap-1 font-bold">
        <label htmlFor="winner-filter">Filter by winner</label>
        <Select
          id="winner-filter"
          aria-label="Filter by winners"
          onChange={(event) => handleWinnerChange(event.target.value)}
        >
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Select>
      </span>
    </div>
  )
}
