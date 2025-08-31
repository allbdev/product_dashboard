import { useQuery } from '@tanstack/react-query'
import { getProducts } from '~/api/products'
import { useRef, useState } from 'react'
import type { ListProductsResponse } from '~/api/products.types'
import type { DefaultErrorResponse } from '~/api/api.types'

interface UseListProductsProps {
  limit?: number
}

export interface UseListProductsReturn {
  data: { data: ListProductsResponse | undefined; error?: DefaultErrorResponse | undefined } | undefined
  error: Error | null
  isLoading: boolean
  getNextPage: () => void
  getPreviousPage: () => void
  hasNextPage: boolean
  hasPreviousPage: boolean
  isLoadingNextOrPreviousPage: boolean
}

export const PRODUCTS_QUERY_KEY = 'products'

export const useListProducts = ({ limit = 10 }: UseListProductsProps): UseListProductsReturn => {
  const firstLoad = useRef(true)
  const [page, setPage] = useState(1)

  const { data, error, isLoading, isFetching, isPlaceholderData } = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, page, limit],
    queryFn: () => getProducts({ page, limit }),
    placeholderData: prev => prev
  })

  const getNextPage = () => {
    if (firstLoad.current) {
      firstLoad.current = false
    }
    setPage(prev => prev + 1)
  }

  const getPreviousPage = () => {
    setPage(prev => prev - 1)
  }

  const hasPreviousPage = page > 1
  const hasNextPage = data?.data?.total ? data?.data?.total > page * limit : false

  return {
    data,
    isLoading: isLoading && firstLoad.current,
    error: error,
    getNextPage,
    getPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isLoadingNextOrPreviousPage: isFetching && isPlaceholderData && !firstLoad.current
  }
}
