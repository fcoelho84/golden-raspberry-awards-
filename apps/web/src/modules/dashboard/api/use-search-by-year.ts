import { GET } from '#/shared/api/api'
import type { Movie } from '#/fatures/movie-list/api/use-movies'
import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import type { AxiosResponse } from 'axios'
import { useEffect } from 'react'

type Response = Omit<Movie, 'winner'>[]

export const useSearchByYear = () => {
  const params = useSearch({ from: '/' })
  const response = useQuery<AxiosResponse<Response>>({
    queryKey: ['winnersByYear'],
    queryFn: () => GET<Response>('movies/winnersByYear', { params }),
  })

  useEffect(() => {
    response.refetch()
  }, [params])

  return response
}
