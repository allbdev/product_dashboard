import type { Route } from './+types/products'
import { Products } from '../pages/products/products'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Products' }, { name: 'description', content: 'Here you can manage the products' }]
}

export default function ProductsRoute() {
  return <Products />
}
