import { createContext, useContext, useState, type ReactNode } from 'react'
import { useDebounce } from 'use-debounce'

interface FilterContextType {
  filter: string
  setFilter: (filter: string) => void
  debouncedFilter: string
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState('')

  const [debouncedFilter] = useDebounce(filter, 500)

  return <FilterContext.Provider value={{ filter, setFilter, debouncedFilter }}>{children}</FilterContext.Provider>
}

export const useFilter = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }

  return context
}
