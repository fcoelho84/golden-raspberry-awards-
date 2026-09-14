import { GET } from '#/shared/api/api'
import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

export interface StudiosWinCount {
  name: string
  winCount: number
}

type Response = {
  studios: StudiosWinCount[]
}

export const useStudioWinCount = () => {
  const response = useQuery<AxiosResponse<Response>>({
    queryKey: ['studiosWithWinCount'],
    queryFn: () =>
      GET<Response>('movies/studiosWithWinCount', {
        params: {
          size: 3,
        },
      }),
  })

  return response
}
