import { useListProductsInfinite } from '~/hooks/useListProducts'
import { AutoSizer, InfiniteLoader, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import type { CSSProperties } from 'react'
import { ErrorMessage } from '../ErrorMessage'
import type { Product } from '~/api/products.types'
import { Skeleton } from '~/components/ui/skeleton'

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 140
})

export const ProductsList = () => {
  const { data, isLoadingNextOrPreviousPage, getNextPage, isLoading, error } = useListProductsInfinite({
    limit: 25
  })

  // total is the total number of products that we expect to have
  const total = data?.data?.total || 0

  const isAllLoaded = data?.data?.products.length === total

  // loadedProductsCount is the number of products that we have loaded + 1 for the loading indicator
  const loadedProductsCount = isAllLoaded ? total : (data?.data?.products.length || 0) + 1

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows =
    isLoadingNextOrPreviousPage || isLoading ? () => Promise.resolve() : () => Promise.resolve(getNextPage())

  // A row is loaded if we have the product data for that index
  const isRowLoaded = ({ index }: { index: number }) => index < (isAllLoaded ? total : loadedProductsCount - 1)

  // Render a list item or a loading indicator.
  const rowRenderer = ({
    index,
    key,
    style,
    parent
  }: {
    index: number
    key: string
    style: CSSProperties
    parent: any
  }) => {
    let content
    let loading = false

    if (!isRowLoaded({ index })) {
      loading = true
    } else {
      content = data?.data?.products[index]
    }

    return (
      <CellMeasurer cache={cache} key={key} parent={parent} rowIndex={index}>
        <div style={style}>{loading ? <ProductItemSkeleton /> : <ProductItem product={content!} />}</div>
      </CellMeasurer>
    )
  }

  if (isLoading || !data) {
    return (
      <div className='flex flex-col gap-2'>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductItemSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (data.error) {
    return <ErrorMessage message={data.error.message} />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={total}>
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              rowRenderer={rowRenderer}
              rowCount={loadedProductsCount}
              height={height}
              width={width}
              rowHeight={cache.rowHeight}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  )
}

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div className='flex flex-col gap-2 border-b border-gray-200 p-2'>
      <div className='flex gap-2'>
        <img src={product.thumbnail} alt={product.title} className='object-contain size-20' />
        <div>
          <div className='text-sm font-medium'>{product.title}</div>
          <div className='flex items-center gap-1'>
            <div>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
            <div className='text-sm text-gray-500'>- {product.stock} in stock</div>
          </div>
        </div>
      </div>
      <div className='text-sm text-gray-500 flex-1 line-clamp-5'>{product.description}</div>
    </div>
  )
}

const ProductItemSkeleton = () => {
  return (
    <div className='flex flex-col gap-2 border-b border-gray-200 p-2'>
      <div className='flex gap-2'>
        <Skeleton className='size-20' />
        <div>
          <div className='text-sm font-medium mb-2'>
            <Skeleton className='w-20 h-4' />
          </div>
          <div className='flex items-center gap-1'>
            <div>
              <Skeleton className='w-20 h-4' />
            </div>
            <div className='text-sm text-gray-500'>
              <Skeleton className='w-20 h-4' />
            </div>
          </div>
        </div>
      </div>
      <div className='text-sm text-gray-500 flex-1 line-clamp-5 space-y-2'>
        <Skeleton className='w-full h-4' />
        <Skeleton className='w-full h-4' />
        <Skeleton className='w-full h-4' />
      </div>
    </div>
  )
}
