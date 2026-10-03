import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useStudioWinCount } from '../../api/use-studio-win-count'
import type { StudiosWinCount } from '../../api/use-studio-win-count'
import { StudioWinCount } from './studio-win-count'

vi.mock('../../api/use-studio-win-count', () => ({
  useStudioWinCount: vi.fn(),
}))

const mockStudios = [
  { name: 'A', winCount: 1 },
  { name: 'B', winCount: 2 },
]

describe('StudioWinCount Component', () => {
  it('mostra loader sem estúdios enquanto carrega', () => {
    vi.mocked(useStudioWinCount).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as ReturnType<typeof useStudioWinCount>)

    render(<StudioWinCount />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.queryByText('A')).not.toBeInTheDocument()
    expect(screen.queryByText('B')).not.toBeInTheDocument()
  })

  it('renderiza nome e contagem de vitórias do estúdio', () => {
    vi.mocked(useStudioWinCount).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          studios: mockStudios,
        },
      },
    } as ReturnType<typeof useStudioWinCount>)

    render(<StudioWinCount />)

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Win Count')).toBeInTheDocument()

    mockStudios.forEach((studio) => {
      expect(screen.getByText(studio.name)).toBeInTheDocument()
      expect(screen.getByText(String(studio.winCount))).toBeInTheDocument()
    })
  })

  it('mostra cabeçalhos sem linhas quando não há estúdios', () => {
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
    expect(screen.queryByText('A')).not.toBeInTheDocument()
    expect(screen.queryByText('B')).not.toBeInTheDocument()
  })
})
