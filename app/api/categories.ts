import type { Category } from './categories.types'

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch('https://dummyjson.com/products/categories')

  return response.json()
}
