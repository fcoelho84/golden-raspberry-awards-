import type { FC } from 'react'

type TableList = {
  className?: string
  columns: string[]
}

export const TableList: FC<TableList> = ({ columns, className }) => {
  return (
    <div
      data-testid="tablelist"
      className={'grid min-w-full border-b border-slate-200 ' + className}
    >
      {columns.map((column, i) => (
        <span key={i} className="p-4 border-r border-slate-200 last:border-r-0">
          {column}
        </span>
      ))}
    </div>
  )
}
