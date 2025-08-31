import { NavLink } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useFilter } from '~/hooks/useFilter'
import { CategorySelect } from './CategorySelect'
import { PlusIcon, XIcon } from 'lucide-react'

export const SearchBar = () => {
  const { filter, setFilter, form, category } = useFilter()

  return (
    <div className='flex items-center gap-2 flex-wrap md:flex-nowrap shrink-0'>
      <Input
        placeholder='Search for a product'
        value={filter}
        onChange={e => {
          setFilter(e.target.value)
          form.setValue('category', '')
        }}
      />
      <div className='flex items-center gap-2 w-full justify-end md:w-fit md:justify-normal'>
        <div className='w-56 flex items-center gap-2'>
          <CategorySelect control={form.control} onChange={() => setFilter('')} />
          {category && (
            <Button
              variant='secondary'
              size='icon'
              onClick={() => form.setValue('category', '')}
              title='Clear category'
            >
              <XIcon />
            </Button>
          )}
        </div>
        <NavLink to='/products/create_product'>
          <Button title='Add Product'>
            <PlusIcon />
          </Button>
        </NavLink>
      </div>
    </div>
  )
}
