import { useListProductsInfinite } from '~/hooks/useListProducts'
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized'
import type { CSSProperties } from 'react'
import { TableSkeleton } from '../TableSkeleton'
import { ErrorMessage } from '../ErrorMessage'

export const ProductsList = () => {
  const { data, isLoadingNextOrPreviousPage, getNextPage, isLoading, error } = useListProductsInfinite({
    limit: 50
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
  const rowRenderer = ({ index, key, style }: { index: number; key: string; style: CSSProperties }) => {
    let content

    if (!isRowLoaded({ index })) {
      content = 'Loading...'
    } else {
      content = data?.data?.products[index]?.title
    }

    return (
      <div key={key} style={style}>
        {content}
      </div>
    )
  }

  if (isLoading ?? !data) {
    return <TableSkeleton />
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
              rowHeight={30}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  )
}
