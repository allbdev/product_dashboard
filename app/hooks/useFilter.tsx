import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { useDebounce } from 'use-debounce'

interface FilterContextType {
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
  debouncedFilter: string
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)

  const [debouncedFilter] = useDebounce(filter, 500)

  return (
    <FilterContext.Provider value={{ filter, setFilter, debouncedFilter, page, setPage }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }

  return context
}
