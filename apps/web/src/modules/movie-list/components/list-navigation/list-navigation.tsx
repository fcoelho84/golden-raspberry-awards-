import { Button } from '#/shared/ui/button/button'
import { useNavigate } from '@tanstack/react-router'
import { useCacheMovies } from '../../api/use-movies'

export const ListNavigation = () => {
  const navigate = useNavigate({ from: '/list' })
  const response = useCacheMovies()

  const currentPage = response?.data.pageable.pageNumber || 1
  const currentSize = response?.data.pageable.pageSize || 10
  const totalRows = response?.data.totalElements || 1

  const goTo = (to: number) => {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        page: currentPage + to,
      }),
    })
  }

  const from = currentSize * currentPage - currentSize + 1
  const to = currentSize * currentPage

  return (
    <div className="flex items-center justify-between px-2 text-sm text-slate-600 gap-4">
      <div>
        Showing {from} to {to} of {totalRows} results.
      </div>

      <div className="flex gap-2">
        <Button onClick={() => goTo(-1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={() => goTo(1)} disabled={to >= totalRows}>
          Next
        </Button>
      </div>
    </div>
  )
}
