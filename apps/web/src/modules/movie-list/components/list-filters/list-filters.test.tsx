import { screen, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { ListFilters } from './list-filters'

const navigate = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => navigate,
}))

describe('ListFilters Component', () => {
  beforeEach(() => {
    navigate.mockReset()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('deve renderizar os campos de filtro de ano e vencedor', () => {
    render(<ListFilters />)

    expect(screen.getByLabelText(/by year/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/by winner/i)).toBeInTheDocument()
  })

  it('deve aplicar o ano só depois do debounce e voltar para a primeira página', () => {
    render(<ListFilters />)

    const input = screen.getByLabelText(/Search by year/i)
    fireEvent.change(input, { target: { value: '199' } })
    fireEvent.change(input, { target: { value: '1990' } })

    expect(navigate).not.toHaveBeenCalled()

    vi.advanceTimersByTime(500)

    expect(navigate).toHaveBeenCalledTimes(1)
    const search = navigate.mock.calls[0][0].search
    expect(search({ page: 4, size: 10, winner: true })).toEqual({
      page: 0,
      size: 10,
      winner: true,
      year: 1990,
    })
  })

  it('deve permitir alterar a opção no select de vencedor', () => {
    render(<ListFilters />)

    const select: HTMLSelectElement = screen.getByLabelText(/Filter by winner/i)
    fireEvent.change(select, { target: { value: 'true' } })

    expect(select.value).toBe('true')
    const search = navigate.mock.calls[0][0].search
    expect(search({ page: 2, size: 10, year: 1980 })).toEqual({
      page: 0,
      size: 10,
      year: 1980,
      winner: true,
    })
  })
})