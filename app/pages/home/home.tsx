import { Link } from 'react-router'
import { Package } from 'lucide-react'
import { Button } from '~/components/ui/button'

export function Home() {
  return (
    <div className='size-full p-4 flex flex-col gap-4 overflow-y-auto'>
      <div className='flex flex-col items-center justify-center min-h-96 text-center space-y-6'>
        <Package className='h-24 w-24' />
        <div className='space-y-4'>
          <h1 className='text-4xl font-bold'>Product Dashboard</h1>
          <p className='text-lg text-muted-foreground max-w-2xl'>
            A modern, responsive dashboard built with React Router v7, TanStack Query, and shadcn/ui. Explore and manage
            products with beautiful UI components.
          </p>
        </div>
        <div className='flex gap-2'>
          <Link to='/products'>
            <Button size='lg'>Explore Products →</Button>
          </Link>
          <a href='https://www.linkedin.com/in/albuquerque-vinicius/' target='_blank' rel='noreferrer'>
            <Button size='lg' variant='secondary'>
              Contact me +
            </Button>
          </a>
        </div>
      </div>

      <div className='grid md:grid-cols-3 gap-4 mt-8'>
        <div className='p-6 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Responsive Design</h3>
          <p className='text-sm text-muted-foreground'>Optimized layouts for every screen size</p>
        </div>
        <div className='p-6 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Smart Caching</h3>
          <p className='text-sm text-muted-foreground'>Efficient data fetching with TanStack Query</p>
        </div>
        <div className='p-6 border rounded-lg'>
          <h3 className='font-semibold mb-2'>Advanced Search</h3>
          <p className='text-sm text-muted-foreground'>Filter products by categories and attributes</p>
        </div>
      </div>
    </div>
  )
}
