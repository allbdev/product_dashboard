import { NavLink } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useFilter } from '~/hooks/useFilter'

export const SearchBar = () => {
  const { filter, setFilter } = useFilter()

  return (
    <div className='flex justify-between items-center gap-2'>
      <Input
        placeholder='Search for a product'
        className='w-56'
        value={filter}
        onChange={e => {
          setFilter(e.target.value)
        }}
      />
      <NavLink to='/products/create_product'>
        <Button>Add Product</Button>
      </NavLink>
    </div>
  )
}
