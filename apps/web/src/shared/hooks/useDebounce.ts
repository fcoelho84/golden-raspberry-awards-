import { useCallback, useRef } from 'react'

export const useDebounce = () => {
  const debounceRef = useRef<any>(null)

  return useCallback(
    (callback: () => void, timeout: number = 500) => {
      if (debounceRef.current) {
        debounceRef.current = null
        clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(() => {
        callback()
        clearTimeout(debounceRef?.current)
      }, timeout)
    },
    [debounceRef],
  )
}
