import { screen, render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ListNavigation } from './list-navigation'
import { useCacheMovies } from '../../api/use-movies'
import type { Movie } from '../../api/use-movies'

const navigate = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => navigate,
}))

vi.mock('../../api/use-movies', () => ({
  useCacheMovies: vi.fn(),
}))

const page = (pageNumber: number, totalElements: number, pageSize = 10) => {
  vi.mocked(useCacheMovies).mockReturnValue({
    data: {
      pageable: {
        pageNumber,
        pageSize,
      },
      totalElements,
      content: [] as Movie[],
    },
  } as ReturnType<typeof useCacheMovies>)
}

describe('ListNavigation Component', () => {
  beforeEach(() => {
    navigate.mockReset()
  })

  it('deve exibir a primeira página a partir do índice 0', () => {
    page(0, 50)

    render(<ListNavigation />)

    expect(screen.getByText('Showing 1 to 10 of 50 results.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Previous/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /Next/i })).toBeEnabled()
  })

  it('deve avançar e voltar mantendo a página atual', () => {
    page(1, 50)

    render(<ListNavigation />)

    expect(screen.getByText('Showing 11 to 20 of 50 results.')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Next/i }))
    expect(navigate.mock.calls[0][0].search({ page: 1, size: 10 })).toEqual({
      page: 2,
      size: 10,
    })

    fireEvent.click(screen.getByRole('button', { name: /Previous/i }))
    expect(navigate.mock.calls[1][0].search({ page: 1, size: 10 })).toEqual({
      page: 0,
      size: 10,
    })
  })

  it('deve desabilitar o botão "Next" na última página', () => {
    page(4, 50)

    render(<ListNavigation />)

    expect(screen.getByText('Showing 41 to 50 of 50 results.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Next/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /Previous/i })).toBeEnabled()
  })
})