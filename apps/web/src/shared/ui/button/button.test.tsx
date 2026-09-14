import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './button'
import { act } from 'react'

describe('Button Component', () => {
  it('deve renderizar o botão com o texto', () => {
    render(<Button>Clique aqui</Button>)

    const btn = screen.getByRole('button', { name: /clique aqui/i })
    expect(btn).toBeInTheDocument()
  })

  it('deve ser possível desabilitar o botão', async () => {
    const mockFn = vi.fn()

    render(
      <Button disabled onClick={mockFn}>
        Desabilitado
      </Button>,
    )

    const btn = screen.getByRole('button', { name: /desabilitado/i })

    act(() => btn.click())

    expect(btn).toBeDisabled()
    expect(btn).toHaveClass('opacity-50', 'cursor-not-allowed', 'bg-slate-100')

    expect(mockFn).not.toHaveBeenCalled()
  })
})
