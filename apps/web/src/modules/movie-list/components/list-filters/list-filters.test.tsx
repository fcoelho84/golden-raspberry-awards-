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

    const yearInput = screen.getByLabelText(/by year/i) as HTMLInputElement
    fireEvent.change(yearInput, { target: { value: '2023' } })

    expect(yearInput.value).toBe('2023')
  })

  it('deve permitir alterar a opção no select de vencedor', async () => {
    render(<ListFilters />)

    const winnerSelect: HTMLSelectElement = screen.getByLabelText(/by winner/i)
    fireEvent.change(winnerSelect, { target: { value: 'true' } })

    expect(winnerSelect.value).toBe('true')
  })
})
