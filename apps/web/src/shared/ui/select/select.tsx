interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = (props) => {
  return (
    <select
      {...props}
      className={`px-3 py-2 border border-slate-200 rounded-md text-slate-700
        outline-none transition-colors
        focus:border-slate-400 focus:ring-1 focus:ring-slate-200
        ${
          props.disabled
            ? 'opacity-50 cursor-not-allowed bg-slate-100'
            : 'bg-white cursor-pointer'
        }
        ${props.className ?? ''}`}
    />
  )
}
