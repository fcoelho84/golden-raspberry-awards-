import { GET } from '#/shared/api/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import type { AxiosResponse } from 'axios'
import { useEffect } from 'react'

export interface Movie {
  id: number
  year: number
  title: string
  winner: boolean
}

export interface PageableMeta {
  pageSize: number
  pageNumber: number
}

export interface PaginatedResponse<T> {
  content: T[]
  pageable: PageableMeta
  totalElements: number
}

type QueryType = AxiosResponse<PaginatedResponse<Movie>>

export const useMovies = () => {
  const params = useSearch({ from: '/list' })
  const response = useQuery<QueryType>({
    queryKey: ['movies'],
    queryFn: () => GET<PaginatedResponse<Movie>>('movies', { params }),
  })

  useEffect(() => {
    response.refetch()
  }, [params])

  return response
}

export const useCacheMovies = () => {
  return useQueryClient().getQueryData<QueryType>(['movies'])
}
