import React, { type PropsWithChildren } from 'react'

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<PropsWithChildren<Button>> = (props) => {
  return (
    <button
      {...props}
      className={`px-3 py-2 border border-slate-200 rounded-md text-slate-700 transition-colors
        ${
          props.disabled
            ? 'opacity-50 cursor-not-allowed bg-slate-100'
            : 'hover:bg-slate-50 active:bg-slate-100 cursor-pointer'
        } ${props.className}`}
      {...props}
    />
  )
}
