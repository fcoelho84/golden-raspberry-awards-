import { screen, render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ListNavigation } from './list-navigation'
import { useCacheMovies, type Movie } from '../../api/use-movies'

vi.mock('../../api/use-movies', () => ({
  useCacheMovies: vi.fn(),
}))

describe('ListNavigation Component', () => {
  it('deve renderizar a label com o calculo correto', () => {
    vi.mocked(useCacheMovies).mockReturnValue({
      data: {
        pageable: {
          pageNumber: 2,
          pageSize: 10,
        },
        totalElements: 50,
        content: [] as Movie[],
      },
    } as ReturnType<typeof useCacheMovies>)

    render(<ListNavigation />)

    expect(
      screen.getByText('Showing 11 to 20 of 50 results.'),
    ).toBeInTheDocument()
  })

  it('deve desabilitar o botão "Previous" na primeira página', async () => {
    vi.mocked(useCacheMovies).mockReturnValue({
      data: {
        pageable: {
          pageNumber: 1,
          pageSize: 10,
        },
        totalElements: 50,
        content: [] as Movie[],
      },
    } as ReturnType<typeof useCacheMovies>)

    render(<ListNavigation />)
    const btn = await screen.findByRole('button', { name: /Previous/i })
    expect(btn).toBeDisabled()
  })

  it('deve desabilitar o botão "Next" quando alcançar o total de registros', async () => {
    vi.mocked(useCacheMovies).mockReturnValue({
      data: {
        pageable: {
          pageNumber: 5,
          pageSize: 10,
        },
        totalElements: 50,
        content: [] as Movie[],
      },
    } as ReturnType<typeof useCacheMovies>)
    render(<ListNavigation />)
    const btn = await screen.findByRole('button', { name: /Next/i })
    expect(btn).toBeDisabled()
  })
})
