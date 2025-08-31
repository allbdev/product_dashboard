import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('products', 'routes/products.tsx', [
    route('create_product', 'routes/create_product.tsx'),
    route('edit_product/:productId', 'routes/edit_product.tsx')
  ])
] satisfies RouteConfig
