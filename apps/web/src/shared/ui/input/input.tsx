import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className={`px-3 py-2 border border-slate-200 rounded-md text-slate-700
        outline-none transition-colors
        placeholder:text-slate-400
        focus:border-slate-400 focus:ring-1 focus:ring-slate-200
        ${
          props.disabled
            ? 'opacity-50 cursor-not-allowed bg-slate-100'
            : 'bg-white'
        }
        ${props.className ?? ''}`}
    />
  )
}
