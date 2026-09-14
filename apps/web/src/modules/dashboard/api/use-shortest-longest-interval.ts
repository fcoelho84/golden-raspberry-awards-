import { GET } from '#/shared/api/api'
import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

export interface Interval {
  producer: string
  interval: number
  previousWin: number
  followingWin: number
}

type Response = {
  min: Interval[]
  max: Interval[]
}

export const useShortestLongestInterval = () => {
  const response = useQuery<AxiosResponse<Response>>({
    queryKey: ['maxMinWinIntervalForProducers'],
    queryFn: () => GET<Response>('movies/maxMinWinIntervalForProducers'),
  })

  return response
}
