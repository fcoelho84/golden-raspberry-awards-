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
  it('deve exibir o loading de carregamento', () => {
    vi.mocked(useMovies).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as ReturnType<typeof useMovies>)

    render(<List />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.queryByText('A')).not.toBeInTheDocument()
  })

  it('deve renderizar a lista de conteúdos', () => {
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
      ;(expect(screen.getByText(movie.id)).toBeInTheDocument(),
        expect(screen.getByText(movie.year)).toBeInTheDocument(),
        expect(screen.getByText(movie.title)).toBeInTheDocument(),
        expect(
          screen.getByText(movie.winner ? 'Yes' : 'No'),
        ).toBeInTheDocument())
    })
  })

  it('deve renderizar a lista de conteúdos vazia', () => {
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
  })
})
