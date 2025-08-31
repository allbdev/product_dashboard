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
import { createProduct, getProduct, updateProduct } from '~/api/products'
import { toast } from 'sonner'
import { PRODUCTS_QUERY_KEY } from '~/hooks/useListProducts'
import { useFilter } from '~/hooks/useFilter'
import { Loader2 } from 'lucide-react'
import { useCallback } from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import { CategorySelect } from '~/components/custom/CategorySelect'

export const CreateProduct = ({ productId }: { productId?: string }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { debouncedFilter, page, category } = useFilter()
  const { mutate, isPending } = useMutation<CreateProductSchema, Error, any>({
    mutationFn: createProduct
  })
  const { mutate: updateProductMutation, isPending: isUpdatePending } = useMutation<CreateProductSchema, Error, any>({
    mutationFn: data => updateProduct(productId ?? '', data)
  })
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: async () => {
      if (productId) {
        const product = await queryClient.fetchQuery({
          queryKey: ['product', productId],
          queryFn: () => getProduct(productId)
        })

        return {
          title: product.title,
          description: product.description,
          category: product.category,
          price: product.price.toString(),
          stock: product.stock.toString()
        }
      }

      return {
        title: '',
        description: '',
        category: '',
        price: '0',
        stock: '0'
      }
    }
  })

  const isEdit = !!productId

  const formState = form.formState

  const onSubmit = useCallback(
    (data: CreateProductSchema) => {
      if (isEdit) {
        updateProductMutation(data, {
          onSuccess: () => {
            toast.success('Product has been updated', {
              description: 'You can now see the product in the products list'
            })
            queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY, 'infinite', 25, debouncedFilter, category] })
            queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY, page, 10, debouncedFilter, category] })
            navigate('/products')
          },
          onError: error => {
            toast.error('Failed to update product', {
              description: error.message
            })
            console.error(error)
          }
        })

        return
      }
      mutate(data, {
        onSuccess: () => {
          toast.success('Product has been created', {
            description: 'You can now see the product in the products list'
          })
          queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY, 'infinite', 25, debouncedFilter, category] })
          queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY, page, 10, debouncedFilter, category] })
          navigate('/products')
        },
        onError: error => {
          toast.error('Failed to create product', {
            description: error.message
          })
          console.error(error)
        }
      })
    },
    [isEdit, mutate, queryClient, navigate, debouncedFilter, page, updateProductMutation, category]
  )

  const isLoading = form.formState.isLoading || isPending || isUpdatePending

  return (
    <Dialog open={true} onOpenChange={() => navigate('/products')}>
      <form onSubmit={form.handleSubmit(onSubmit, errors => console.log(errors))}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Edit product' : 'Create product'}</DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <FormSkeleton />
          ) : (
            <>
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
                  <CategorySelect control={form.control} label='Category' />
                </div>
                <div className='flex gap-3'>
                  <div className='grid gap-3'>
                    <Label htmlFor='price-1'>Price</Label>
                    <Input id='price-1' placeholder='Enter price' type='number' {...form.register('price')} />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='stock-1'>Stock</Label>
                    <Input
                      id='stock-1'
                      placeholder='Enter stock'
                      type='number'
                      prefix='$'
                      {...form.register('stock')}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
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
              <Button variant='outline' disabled={isLoading} onClick={() => navigate('/products')}>
                Cancel
              </Button>
            </DialogClose>
            <Button type='button' disabled={isLoading} onClick={() => form.handleSubmit(onSubmit)()}>
              {isEdit ? 'Edit product' : 'Create product'}
              {isLoading && <Loader2 className='size-4 animate-spin' />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

const FormSkeleton = () => {
  return (
    <div className='grid gap-4'>
      <div className='grid gap-3'>
        <Skeleton className='w-1/2 h-4' />
        <Skeleton className='w-full h-8' />
      </div>
      <div className='grid gap-3'>
        <Skeleton className='w-1/2 h-4' />
        <Skeleton className='w-full h-8' />
      </div>
      <div className='grid gap-3'>
        <Skeleton className='w-1/2 h-4' />
        <Skeleton className='w-full h-8' />
      </div>
      <div className='flex gap-3 w-full'>
        <div className='grid gap-3 grow'>
          <Skeleton className='w-1/2 h-4' />
          <Skeleton className='w-full h-8' />
        </div>
        <div className='grid gap-3 grow'>
          <Skeleton className='w-1/2 h-4' />
          <Skeleton className='w-full h-8' />
        </div>
      </div>
    </div>
  )
}
