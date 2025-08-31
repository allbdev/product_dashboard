import { useNavigate } from 'react-router'
import { Button } from '~/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import type { CreateProductSchema } from './domain'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProductSchema } from './domain'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '~/api/products'
import { toast } from 'sonner'
import { PRODUCTS_QUERY_KEY } from '~/hooks/useListProducts'
import { useFilter } from '~/hooks/useFilter'
import { Loader2 } from 'lucide-react'

export const CreateProduct = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { debouncedFilter, page } = useFilter()
  const { mutate, isPending } = useMutation<CreateProductSchema, Error, any>({
    mutationFn: createProduct
  })
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: '0',
      stock: '0'
    }
  })

  const formState = form.formState

  const onSubmit = (data: CreateProductSchema) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Product has been created', {
          description: 'You can now see the product in the products list'
        })
        queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY, 'infinite', 25, debouncedFilter] })
        queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY, page, 10, debouncedFilter] })
        navigate('/products')
      },
      onError: error => {
        toast.error('Failed to create product', {
          description: error.message
        })
        console.error(error)
      }
    })
  }

  return (
    <Dialog open={true} onOpenChange={() => navigate('/products')}>
      <form onSubmit={form.handleSubmit(onSubmit, errors => console.log(errors))}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create product</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='title-1'>Title</Label>
              <Input id='title-1' placeholder='Enter title' {...form.register('title')} />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='description-1'>Description</Label>
              <Input id='description-1' placeholder='Enter description' {...form.register('description')} />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='category-1'>Category</Label>
              <Input id='category-1' placeholder='Enter category' {...form.register('category')} />
            </div>
            <div className='flex gap-3'>
              <div className='grid gap-3'>
                <Label htmlFor='price-1'>Price</Label>
                <Input id='price-1' placeholder='Enter price' type='number' {...form.register('price')} />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='stock-1'>Stock</Label>
                <Input id='stock-1' placeholder='Enter stock' type='number' prefix='$' {...form.register('stock')} />
              </div>
            </div>
          </div>
          {formState.errors && (
            <div className='text-red-500'>
              {Object.entries(form.formState.errors).map(([key, error], i) => (
                <p key={i}>
                  {key}: {error?.message}
                </p>
              ))}
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' disabled={isPending} onClick={() => navigate('/products')}>
                Cancel
              </Button>
            </DialogClose>
            <Button type='button' disabled={isPending} onClick={() => form.handleSubmit(onSubmit)()}>
              Create product
              {isPending && <Loader2 className='size-4 animate-spin' />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
