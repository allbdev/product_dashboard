import { Pencil, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useNavigate } from 'react-router'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import type { Product } from '~/api/products.types'
import { deleteProduct } from '~/api/products'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useFilter } from '~/hooks/useFilter'
import { PRODUCTS_QUERY_KEY } from '~/hooks/useListProducts'
import { useState } from 'react'

export const Buttons = ({ product }: { product: Product }) => {
  const navigate = useNavigate()

  return (
    <div className='flex gap-2'>
      <Button variant='ghost' onClick={() => navigate(`/products/edit_product/${product.id}`)}>
        <Pencil className='size-4' />
      </Button>
      <DeleteButton product={product} />
    </div>
  )
}

const DeleteButton = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { debouncedFilter, page } = useFilter()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteProduct
  })

  const onDelete = () => {
    mutate(product.id.toString(), {
      onSuccess: () => {
        toast.success('Product has been deleted', {
          description: 'You can now see the product in the products list'
        })
        queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY, 'infinite', 25, debouncedFilter] })
        queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY, page, 10, debouncedFilter] })
        setIsOpen(false)
      },
      onError: error => {
        toast.error('Failed to delete product', {
          description: error.message
        })
        console.error(error)
      }
    })
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='ghost'>
          <Trash className='size-4 text-red-500' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete {product.title}?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
