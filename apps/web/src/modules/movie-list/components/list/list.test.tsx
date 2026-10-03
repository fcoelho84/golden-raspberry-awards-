import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { List } from './list'
import { useMovies } from '../../api/use-movies'
import type { Movie } from '../../api/use-movies'

vi.mock('../../api/use-movies', () => ({
  useMovies: vi.fn(),
}))

const mockMovies = [
  { id: 1, year: 2000, title: 'A', winner: true },
  { id: 2, year: 2001, title: 'B', winner: false },
]

describe('List Component', () => {
  it('mostra loader e cabeçalho sem filmes enquanto carrega', () => {
    vi.mocked(useMovies).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as ReturnType<typeof useMovies>)

    render(<List />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.queryByText('A')).not.toBeInTheDocument()
    expect(screen.queryByText('B')).not.toBeInTheDocument()
  })

  it('renderiza os filmes retornados pela API', () => {
    vi.mocked(useMovies).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          content: mockMovies,
        },
      },
    } as ReturnType<typeof useMovies>)

    render(<List />)

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()

    mockMovies.forEach((movie) => {
      expect(screen.getByText(String(movie.id))).toBeInTheDocument()
      expect(screen.getByText(String(movie.year))).toBeInTheDocument()
      expect(screen.getByText(movie.title)).toBeInTheDocument()
      expect(screen.getByText(movie.winner ? 'Yes' : 'No')).toBeInTheDocument()
    })
  })

  it('mostra só o cabeçalho quando a lista está vazia', () => {
    vi.mocked(useMovies).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          content: [] as Movie[],
        },
      },
    } as ReturnType<typeof useMovies>)

    render(<List />)

    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    expect(screen.queryByText('1')).not.toBeInTheDocument()
    expect(screen.queryByText('A')).not.toBeInTheDocument()
  })
})
