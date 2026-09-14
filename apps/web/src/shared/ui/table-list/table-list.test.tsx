import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TableList } from './table-list'

describe('TableList Component', () => {
  const columns = ['ID', 'Código', 'Descrição', 'Ações']

  it('deve renderizar todas as colunas passadas', () => {
    render(<TableList columns={columns} />)

    columns.forEach((col) => {
      expect(screen.getByText(col)).toBeInTheDocument()
    })
  })

  it('deve aplicar a as classes customizadas', () => {
    render(<TableList columns={columns} className="bg-red-200" />)

    const tableList = screen.getByTestId('tablelist')
    expect(tableList).toHaveClass('bg-red-200')
  })
})
