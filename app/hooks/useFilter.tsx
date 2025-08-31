import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { useDebounce } from 'use-debounce'
import { useForm, useWatch, type UseFormReturn } from 'react-hook-form'

interface FilterContextType {
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
  debouncedFilter: string
  page: number
  setPage: Dispatch<SetStateAction<number>>
  form: UseFormReturn<any>
  category: string
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const form = useForm({
    defaultValues: {
      category: ''
    }
  })
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)

  const [debouncedFilter] = useDebounce(filter, 500)

  const category = useWatch({ control: form.control, name: 'category' })

  return (
    <FilterContext.Provider value={{ filter, setFilter, debouncedFilter, page, setPage, form, category }}>
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
