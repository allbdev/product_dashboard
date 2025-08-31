import type { Route } from './+types/edit_product'
import { CreateProduct } from '../pages/create_product/create_product'
import { useParams } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Edit product' }, { name: 'description', content: 'Here you can edit a product' }]
}

export default function EditProductRoute() {
  const { productId } = useParams()

  return <CreateProduct productId={productId} />
}
