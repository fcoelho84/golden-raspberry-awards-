import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('digitação rápida processa só o último valor depois do intervalo', () => {
    const { result } = renderHook(() => useDebounce())
    const calls: string[] = []

    act(() => {
      result.current(() => calls.push('19'))
      result.current(() => calls.push('199'))
      result.current(() => calls.push('1990'))
    })

    expect(calls).toEqual([])

    act(() => {
      vi.advanceTimersByTime(499)
    })
    expect(calls).toEqual([])

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(calls).toEqual(['1990'])
  })

  it('alterações consecutivas após o intervalo disparam cada uma', () => {
    const { result } = renderHook(() => useDebounce())
    const calls: string[] = []

    act(() => {
      result.current(() => calls.push('1980'))
    })
    act(() => {
      vi.advanceTimersByTime(500)
    })
    act(() => {
      result.current(() => calls.push('1981'))
    })
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(calls).toEqual(['1980', '1981'])
  })

  it('a limpeza cancela o debounce pendente', () => {
    const { result, unmount } = renderHook(() => useDebounce())
    const callback = vi.fn()

    act(() => {
      result.current(callback)
    })
    unmount()
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(callback).not.toHaveBeenCalled()
  })
})