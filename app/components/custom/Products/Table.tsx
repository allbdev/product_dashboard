import { useListProducts, type UseListProductsReturn } from '~/hooks/useListProducts'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../../ui/table'
import { Button } from '../../ui/button'
import { ErrorMessage } from '../ErrorMessage'
import { TableSkeleton } from '../TableSkeleton'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

export const ProductsTable = () => {
  const products = useListProducts({})

  if (products.isLoading ?? !products.data) {
    return <TableSkeleton />
  }

  if (products.data.error) {
    return <ErrorMessage message={products.data.error.message} />
  }

  if (products.error) {
    return <ErrorMessage message={products.error.message} />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-32'>Name</TableHead>
          <TableHead className='max-w-36'>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.data?.data?.products.map(product => (
          <TableRow key={product.id}>
            <TableCell title={product.title} className='w-32'>
              <div className='flex items-center gap-2'>
                <img src={product.thumbnail} alt={product.title} className='size-10' />
                <span className='truncate'>{product.title}</span>
              </div>
            </TableCell>
            <TableCell title={product.description} className='max-w-36 truncate'>
              {product.description}
            </TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
            </TableCell>
            <TableCell>{product.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            <Pagination products={products} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

const Pagination = ({ products }: { products: UseListProductsReturn }) => {
  return (
    <div className='flex justify-end gap-2 items-center'>
      <Button
        variant='ghost'
        disabled={products.isLoadingNextOrPreviousPage || !products.hasPreviousPage}
        onClick={products.getPreviousPage}
      >
        {products.isLoadingNextOrPreviousPage ? <Loader2 className='animate-spin' /> : <ChevronLeft />}
      </Button>
      <span className='text-sm text-gray-500'>
        {products.pageInfo?.init} - {products.pageInfo?.end} of {products.pageInfo?.total}
      </span>
      <Button
        disabled={products.isLoadingNextOrPreviousPage || !products.hasNextPage}
        onClick={products.getNextPage}
        variant='ghost'
      >
        {products.isLoadingNextOrPreviousPage ? <Loader2 className='animate-spin' /> : <ChevronRight />}
      </Button>
    </div>
  )
}
