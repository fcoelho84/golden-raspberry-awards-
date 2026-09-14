import { GET } from '#/shared/api/api'
import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

export interface MovieWinCount {
  year: number
  winnerCount: number
}

type Response = {
  years: MovieWinCount[]
}

export const useMovieWinCount = () => {
  const response = useQuery<AxiosResponse<Response>>({
    queryKey: ['yearsWithMultipleWinners'],
    queryFn: () => GET<Response>('movies/yearsWithMultipleWinners'),
  })

  return response
}
