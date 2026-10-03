import { useCallback, useEffect, useRef } from 'react'

export const useDebounce = () => {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return useCallback((callback: () => void, timeout: number = 500) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      debounceRef.current = null
      callback()
    }, timeout)
  }, [])
}
