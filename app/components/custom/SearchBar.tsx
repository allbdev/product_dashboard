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
          console.log('1')
          console.log('e.target.value', e.target.value)
          setFilter(e.target.value)
        }}
      />
      <Button>Add Product</Button>
    </div>
  )
}
