import { useListProducts } from '~/hooks/useListProducts'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../../ui/table'
import { Button } from '../../ui/button'
import { ErrorMessage } from '../ErrorMessage'
import { TableSkeleton } from '../TableSkeleton'

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
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.data?.data?.products.map(product => (
          <TableRow key={product.id}>
            <TableCell title={product.title} className='w-32 truncate'>
              {product.title}
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
            <div className='flex justify-end gap-2'>
              <Button
                disabled={products.isLoadingNextOrPreviousPage || !products.hasPreviousPage}
                onClick={products.getPreviousPage}
              >
                Previous
              </Button>
              <Button
                disabled={products.isLoadingNextOrPreviousPage || !products.hasNextPage}
                onClick={products.getNextPage}
              >
                Next
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
