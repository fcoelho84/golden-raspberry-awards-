import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Select } from './select'

describe('Select Component', () => {
  it('deve renderizar as opções e disparar o evento ao selecionar', () => {
    const mockFn = vi.fn()

    render(
      <Select onChange={mockFn} data-testid="select">
        <option value="1">Opção 1</option>
        <option value="2">Opção 2</option>
      </Select>,
    )

    const select = screen.getByTestId('select') as HTMLSelectElement
    fireEvent.change(select, { target: { value: '2' } })

    expect(select).toBeInTheDocument()
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(select.value).toBe('2')
  })
})
