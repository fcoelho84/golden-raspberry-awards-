import { render, screen } from '@testing-library/react'
import { it, expect, vi, describe } from 'vitest'
import { useShortestLongestInterval } from '../../api/use-shortest-longest-interval'
import type { Interval } from '../../api/use-shortest-longest-interval'
import { ShortestLongestInterval } from './shortest-longest-interval'

vi.mock('../../api/use-shortest-longest-interval', () => ({
  useShortestLongestInterval: vi.fn(),
}))

const mockMovies = {
  producer: 'A',
  interval: 1,
  previousWin: 2000,
  followingWin: 2001,
}

describe('ShortestLongestInterval Component', () => {
  it('deve exibir o loading de carregamento', () => {
    vi.mocked(useShortestLongestInterval).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as ReturnType<typeof useShortestLongestInterval>)

    render(<ShortestLongestInterval />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('deve renderizar a lista de conteúdos', () => {
    vi.mocked(useShortestLongestInterval).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          max: [mockMovies],
          min: [mockMovies],
        },
      },
    } as ReturnType<typeof useShortestLongestInterval>)

    render(<ShortestLongestInterval />)

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    expect(screen.queryAllByText(mockMovies.producer)[0]).toBeInTheDocument()
    expect(screen.queryAllByText(mockMovies.interval)[0]).toBeInTheDocument()
    expect(screen.queryAllByText(mockMovies.previousWin)[0]).toBeInTheDocument()
    expect(
      screen.queryAllByText(mockMovies.followingWin)[0],
    ).toBeInTheDocument()
  })

  it('deve renderizar a lista de conteúdos vazia', () => {
    vi.mocked(useShortestLongestInterval).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          max: [] as Interval[],
          min: [] as Interval[],
        },
      },
    } as ReturnType<typeof useShortestLongestInterval>)

    render(<ShortestLongestInterval />)

    expect(screen.queryAllByText('Producer')[0]).toBeInTheDocument()
    expect(screen.queryAllByText('Interval')[0]).toBeInTheDocument()
    expect(screen.queryAllByText('Previous year')[0]).toBeInTheDocument()
    expect(screen.queryAllByText('Following year')[0]).toBeInTheDocument()
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  })
})
