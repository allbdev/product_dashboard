import type { DefaultErrorResponse } from './api.types'
import type { ListProductsResponse } from './products.types'

export const getProducts = async (
  {},
  {}
): Promise<{
  data: ListProductsResponse
  error?: DefaultErrorResponse
}> => {
  try {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()

    return data
  } catch (error) {
    return {
      data: {
        products: [],
        total: 0,
        skip: 0,
        limit: 0
      },
      error: {
        message: 'Failed to fetch products',
        statusCode: 500
      }
    }
  }
}
