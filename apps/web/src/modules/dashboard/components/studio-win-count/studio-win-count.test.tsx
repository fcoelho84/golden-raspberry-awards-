import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useStudioWinCount } from '../../api/use-studio-win-count'
import type { StudiosWinCount } from '../../api/use-studio-win-count'
import { StudioWinCount } from './studio-win-count'

vi.mock('../../api/use-studio-win-count', () => ({
  useStudioWinCount: vi.fn(),
}))

const mockMovies = [
  { name: 'A', winCount: 1 },
  { name: 'B', winCount: 2 },
]

describe('StudioWinCount Component', () => {
  it('deve exibir o loading de carregamento', () => {
    vi.mocked(useStudioWinCount).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as ReturnType<typeof useStudioWinCount>)

    render(<StudioWinCount />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.queryByText('Win Count')).toBeInTheDocument()
  })

  it('deve renderizar a lista de conteúdos', () => {
    vi.mocked(useStudioWinCount).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          studios: mockMovies,
        },
      },
    } as ReturnType<typeof useStudioWinCount>)

    render(<StudioWinCount />)

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()

    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.name)).toBeInTheDocument()
      expect(screen.getByText(movie.winCount)).toBeInTheDocument()
    })
  })

  it('deve renderizar a lista de conteúdos vazia', () => {
    vi.mocked(useStudioWinCount).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          studios: [] as StudiosWinCount[],
        },
      },
    } as ReturnType<typeof useStudioWinCount>)

    render(<StudioWinCount />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Win Count')).toBeInTheDocument()
  })
})
