import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '#/shared/ui/input/input'
import { useDebounce } from './useDebounce'

const DebounceDemo = () => {
  const debounce = useDebounce()
  const [raw, setRaw] = useState('')
  const [debounced, setDebounced] = useState('')

  return (
    <div className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-bold text-slate-700">
        Digite
        <Input
          aria-label="Valor com debounce"
          value={raw}
          onChange={(event) => {
            const value = event.target.value
            setRaw(value)
            debounce(() => setDebounced(value), 500)
          }}
        />
      </label>
      <p className="text-sm text-slate-600">
        Valor imediato: <strong>{raw || '—'}</strong>
      </p>
      <p className="text-sm text-slate-600">
        Após debounce (500 ms): <strong>{debounced || '—'}</strong>
      </p>
    </div>
  )
}

const meta = {
  title: 'Shared/Hooks/useDebounce',
  component: DebounceDemo,
} satisfies Meta<typeof DebounceDemo>

export default meta

type Story = StoryObj<typeof meta>

export const Interactive: Story = {}
