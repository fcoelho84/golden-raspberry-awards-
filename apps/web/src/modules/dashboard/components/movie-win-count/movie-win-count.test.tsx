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
  it('mostra loader sem anos enquanto carrega', () => {
    vi.mocked(useMovieWinCount).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as ReturnType<typeof useMovieWinCount>)

    render(<MovieWinCount />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.queryByText('2000')).not.toBeInTheDocument()
    expect(screen.queryByText('2001')).not.toBeInTheDocument()
  })

  it('renderiza ano e contagem de vitórias', () => {
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
    expect(screen.getByText('Year')).toBeInTheDocument()
    expect(screen.getByText('Win Count')).toBeInTheDocument()

    mockMovies.forEach((movie) => {
      expect(screen.getByText(String(movie.year))).toBeInTheDocument()
      expect(screen.getByText(String(movie.winnerCount))).toBeInTheDocument()
    })
  })

  it('mostra cabeçalhos sem linhas quando não há anos', () => {
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
    expect(screen.queryByText('2000')).not.toBeInTheDocument()
    expect(screen.queryByText('2001')).not.toBeInTheDocument()
  })
})
