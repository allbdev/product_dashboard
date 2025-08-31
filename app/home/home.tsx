import { ErrorMessage } from '~/components/custom/ErrorMessage'
import { ProductsTable } from '~/components/custom/ProductsTable'
import { TableSkeleton } from '~/components/custom/TableSkeleton'
import { useListProducts } from '~/hooks/useListProducts'

export function Home() {
  const products = useListProducts({})

  return (
    <main className='size-full p-4'>
      {(products.isLoading ?? !products.data) ? (
        <TableSkeleton />
      ) : products.data.error ? (
        <ErrorMessage message={products.data.error.message} />
      ) : products.error ? (
        <ErrorMessage message={products.error.message} />
      ) : (
        <ProductsTable products={products} />
      )}
    </main>
  )
}
