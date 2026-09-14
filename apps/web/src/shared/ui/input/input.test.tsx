import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './input'

describe('Input Component', () => {
  it('deve renderizar e repassar atributos HTML básicos', () => {
    const mockFn = vi.fn()
    render(<Input data-testid="desabilitado" onChange={mockFn} />)

    const input = screen.getByTestId('desabilitado')

    fireEvent.change(input, { target: { value: 'Teste' } })

    expect(input).toBeInTheDocument()
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('deve ser possível desabilitar o input', async () => {
    render(<Input disabled data-testid="desabilitado" />)

    const input = screen.getByTestId('desabilitado')

    expect(input).toBeDisabled()
    expect(input).toHaveClass(
      'opacity-50',
      'cursor-not-allowed',
      'bg-slate-100',
    )
  })
})
