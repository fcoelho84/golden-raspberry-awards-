import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useMovieWinCount } from '../../api/use-movie-win-count'
import type { MovieWinCount as TypeMovieCount } from '../../api/use-movie-win-count'
import { MovieWinCount } from './movie-win-count'

vi.mock('../../api/use-movie-win-count', () => ({
  useMovieWinCount: vi.fn(),
}))

const mockMovies = [
  { year: 2000, winnerCount: 1 },
  { year: 2001, winnerCount: 2 },
]

describe('MovieWinCount Component', () => {
  it('deve exibir o loading de carregamento', () => {
    vi.mocked(useMovieWinCount).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as ReturnType<typeof useMovieWinCount>)

    render(<MovieWinCount />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.getByText('Year')).toBeInTheDocument()
    expect(screen.queryByText('Win Count')).toBeInTheDocument()
  })

  it('deve renderizar a lista de conteúdos', () => {
    vi.mocked(useMovieWinCount).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          years: mockMovies,
        },
      },
    } as ReturnType<typeof useMovieWinCount>)

    render(<MovieWinCount />)

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()

    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.year)).toBeInTheDocument()
      expect(screen.getByText(movie.winnerCount)).toBeInTheDocument()
    })
  })

  it('deve renderizar a lista de conteúdos vazia', () => {
    vi.mocked(useMovieWinCount).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          years: [] as TypeMovieCount[],
        },
      },
    } as ReturnType<typeof useMovieWinCount>)

    render(<MovieWinCount />)

    expect(screen.getByText('Year')).toBeInTheDocument()
    expect(screen.getByText('Win Count')).toBeInTheDocument()
  })
})
