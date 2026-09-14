import { TableList } from '#/shared/ui/table-list/table-list'
import { Loader } from '#/shared/ui/loader/loader'
import { Input } from '#/shared/ui/input/input'
import { useDebounce } from '#/shared/hooks/useDebounce'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useSearchByYear } from '../../api/use-search-by-year'
import { useState } from 'react'

export const SearchByYear = () => {
  const response = useSearchByYear()
  const params = useSearch({ from: '/' })
  const navigate = useNavigate({ from: '/' })
  const debounce = useDebounce()
  const [value, setValue] = useState(params.year || '')

  const handleSearch = (year: string) => {
    setValue(year)
    debounce(() =>
      navigate({
        search: (prev) => ({
          ...prev,
          year: parseInt(year),
        }),
      }),
    )
  }

  if (response.isLoading) {
    return (
      <div className="max-w-fit border border-slate-200 rounded-md overflow-hidden">
        <TableList
          columns={['Id', 'Year', 'Title']}
          className="font-bold bg-white grid-cols-[96px_96px_auto]"
        />
        <Loader />
      </div>
    )
  }

  const data = response.data?.data ?? []

  return (
    <div className="flex gap-2 flex-col">
      <h2 className="font-bold">List movie winners by year</h2>
      <span className="flex gap-1 flex-col font-bold">
        <label htmlFor="year-filter">Search by year</label>
        <Input
          value={value}
          id="year-filter"
          type="number"
          aria-label="Filter by year"
          onChange={(event) => handleSearch(event.target.value)}
        />
      </span>
      <div className="max-w-fit border border-slate-200 rounded-md overflow-hidden">
        <TableList
          columns={['Id', 'Year', 'Title']}
          className="font-bold bg-white grid-cols-[96px_96px_auto]"
        />

        {data.map((movie, i) => (
          <TableList
            key={i}
            columns={[String(movie.id), String(movie.year), movie.title]}
            className="last:border-b-0 grid-cols-[96px_96px_auto]"
          />
        ))}
      </div>
    </div>
  )
}
