import { Pencil } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useNavigate } from 'react-router'

export const Buttons = ({ productId }: { productId: string }) => {
  const navigate = useNavigate()

  return (
    <div className='flex gap-2'>
      <Button variant='ghost' onClick={() => navigate(`/products/edit_product/${productId}`)}>
        <Pencil className='size-4' />
      </Button>
    </div>
  )
}
