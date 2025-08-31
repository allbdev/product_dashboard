import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
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
  pageInfo?: {
    page: number
    init: number
    end: number
    total: number
  }
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

  const pageInfo = {
    page,
    init: (page - 1) * limit + 1,
    end: data?.data?.total ? Math.min(page * limit, data?.data?.total) : page * limit,
    total: data?.data?.total || 0
  }

  return {
    data,
    isLoading: isLoading && firstLoad.current,
    error: error,
    getNextPage,
    getPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isLoadingNextOrPreviousPage: isFetching && isPlaceholderData && !firstLoad.current,
    pageInfo
  }
}

export const useListProductsInfinite = ({ limit = 10 }: UseListProductsProps): UseListProductsReturn => {
  const { data, error, isLoading, isFetching, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } =
    useInfiniteQuery({
      queryKey: [PRODUCTS_QUERY_KEY, 'infinite', limit],
      queryFn: ({ pageParam = 1 }) => getProducts({ page: pageParam, limit }),
      getNextPageParam: (lastPage, pages) => {
        const currentTotal = pages.length * limit

        return lastPage.data.total > currentTotal ? pages.length + 1 : undefined
      },
      getPreviousPageParam: (_, pages) => {
        return pages.length > 1 ? pages.length - 1 : undefined
      },
      initialPageParam: 1
    })

  return {
    data: data
      ? {
          data: {
            products: data.pages.flatMap(page => page.data.products),
            total: data.pages[0]?.data.total || 0,
            skip: 0,
            limit: data.pages.reduce((acc, page) => acc + page.data.products.length, 0)
          },
          error: data.pages.find(page => page.error)?.error
        }
      : undefined,
    isLoading,
    error,
    getNextPage: () => fetchNextPage(),
    getPreviousPage: () => fetchPreviousPage(),
    hasNextPage: hasNextPage || false,
    hasPreviousPage: hasPreviousPage || false,
    isLoadingNextOrPreviousPage: isFetching && !isLoading
  }
}
