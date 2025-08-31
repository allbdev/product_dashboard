import type { Route } from './+types/create_product'
import { CreateProduct } from '../pages/create_product/create_product'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Create product' }, { name: 'description', content: 'Here you can create a new product' }]
}

export default function CreateProductRoute() {
  return <CreateProduct />
}
