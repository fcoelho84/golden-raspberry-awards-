import { GET } from '#/shared/api/api'
import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import type { AxiosResponse } from 'axios'

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
  return useQuery<QueryType>({
    queryKey: ['movies', params],
    queryFn: () => GET<PaginatedResponse<Movie>>('movies', { params }),
  })
}

export const useCacheMovies = () => {
  const { data } = useMovies()
  return data
}
