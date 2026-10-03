import { render, screen, within } from '@testing-library/react'
import { it, expect, vi, describe } from 'vitest'
import { useShortestLongestInterval } from '../../api/use-shortest-longest-interval'
import type { Interval } from '../../api/use-shortest-longest-interval'
import { ShortestLongestInterval } from './shortest-longest-interval'

vi.mock('../../api/use-shortest-longest-interval', () => ({
  useShortestLongestInterval: vi.fn(),
}))

const minimumInterval = {
  producer: 'Joel Silver',
  interval: 1,
  previousWin: 1990,
  followingWin: 1991,
}

const maximumInterval = {
  producer: 'Matthew Vaughn',
  interval: 13,
  previousWin: 2002,
  followingWin: 2015,
}

const section = (name: string) => {
  const heading = screen.getByRole('heading', { name })
  const table = heading.nextElementSibling
  if (!table) throw new Error(`Seção ${name} sem conteúdo`)
  return within(table as HTMLElement)
}

describe('ShortestLongestInterval Component', () => {
  it('mostra loader enquanto carrega', () => {
    vi.mocked(useShortestLongestInterval).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as ReturnType<typeof useShortestLongestInterval>)

    render(<ShortestLongestInterval />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Maximum' })).not.toBeInTheDocument()
  })

  it('mostra Maximum e Minimum com produtores distintos', () => {
    vi.mocked(useShortestLongestInterval).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          max: [maximumInterval],
          min: [minimumInterval],
        },
      },
    } as ReturnType<typeof useShortestLongestInterval>)

    render(<ShortestLongestInterval />)

    const maximum = section('Maximum')
    const minimum = section('Minimum')

    expect(maximum.getByText(maximumInterval.producer)).toBeInTheDocument()
    expect(maximum.getByText(String(maximumInterval.interval))).toBeInTheDocument()
    expect(maximum.queryByText(minimumInterval.producer)).not.toBeInTheDocument()

    expect(minimum.getByText(minimumInterval.producer)).toBeInTheDocument()
    expect(minimum.getByText(String(minimumInterval.interval))).toBeInTheDocument()
    expect(minimum.queryByText(maximumInterval.producer)).not.toBeInTheDocument()
  })

  it('mostra cabeçalhos sem linhas de produtor quando min e max estão vazios', () => {
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

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    expect(section('Maximum').getByText('Producer')).toBeInTheDocument()
    expect(section('Minimum').getByText('Producer')).toBeInTheDocument()
    expect(screen.queryByText(minimumInterval.producer)).not.toBeInTheDocument()
    expect(screen.queryByText(maximumInterval.producer)).not.toBeInTheDocument()
  })
})
