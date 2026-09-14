import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Layout } from './layout'
import '@testing-library/jest-dom/vitest'
import { act } from 'react'

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    ...props
  }: {
    children: React.ReactNode
    to: string
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

describe('Layout Component', () => {
  it('deve iniciar com o menu aberto em telas grandes', () => {
    vi.stubGlobal('innerWidth', 1024)

    render(<Layout />)

    const btn = screen.getByRole('button')

    expect(btn).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Dashboard')).toBeVisible()
    expect(screen.getByText('List')).toBeVisible()
  })

  it('deve iniciar com o menu fechado em telas pequenas', () => {
    vi.stubGlobal('innerWidth', 600)

    render(<Layout />)

    const btn = screen.getByRole('button')

    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('deve abrir e fechar o menu ao clicar no botão', () => {
    vi.stubGlobal('innerWidth', 1024)
    render(<Layout />)

    const btn = screen.getByRole('button')

    act(() => btn.click())

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')

    act(() => btn.click())

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })
})
