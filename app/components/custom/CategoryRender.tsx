import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCategories } from '~/api/categories'
import type { Category } from '~/api/categories.types'
import { Skeleton } from '../ui/skeleton'

export const CategoryRender = ({ category }: { category: string }) => {
  const queryClient = useQueryClient()
  const cachedData = queryClient.getQueryData(['categories']) as Category[] | undefined

  if (cachedData) {
    return <div>{cachedData?.find(c => c.slug === category)?.name}</div>
  }

  return <AsyncCategoryRender category={category} />
}

const AsyncCategoryRender = ({ category }: { category: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  if (isLoading) {
    return <Skeleton className='w-1/2 h-4' />
  }

  return <div>{data?.find(c => c.slug === category)?.name}</div>
}
