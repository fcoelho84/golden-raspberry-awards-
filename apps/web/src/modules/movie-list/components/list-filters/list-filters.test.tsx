import { screen, fireEvent, render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ListFilters } from './list-filters'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

describe('ListFilters Component', () => {
  it('deve renderizar os campos de filtro de ano e vencedor', () => {
    render(<ListFilters />)

    expect(screen.getByLabelText(/by year/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/by winner/i)).toBeInTheDocument()
  })

  it('deve permitir a digitação no campo de ano', () => {
    render(<ListFilters />)

    const input: HTMLSelectElement = screen.getByLabelText(/Search by year/i)
    fireEvent.change(input, { target: { value: '2023' } })

    expect(input.value).toBe('2023')
  })

  it('deve permitir alterar a opção no select de vencedor', async () => {
    render(<ListFilters />)

    const select: HTMLSelectElement = screen.getByLabelText(/Filter by winner/i)
    fireEvent.change(select, { target: { value: 'true' } })

    expect(select.value).toBe('true')
  })
})
