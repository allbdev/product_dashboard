import type { DefaultErrorResponse } from './api.types'
import type { ListProductsResponse } from './products.types'

export const getProducts = async ({
  page,
  limit
}: {
  page: number
  limit: number
}): Promise<{
  data: ListProductsResponse
  error?: DefaultErrorResponse
}> => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?skip=${(page - 1) * limit}&limit=${limit}&delay=${randomDelay()}`
    )
    const data = await response.json()

    if ('message' in data) {
      throw new Error(data.message as string)
    }

    return {
      data: data as ListProductsResponse,
      error: undefined
    }
  } catch (error) {
    return {
      data: {
        products: [],
        total: 0,
        skip: 0,
        limit: 0
      },
      error: {
        message: error instanceof Error ? error.message : 'Failed to fetch products',
        statusCode: 500
      }
    }
  }
}

function randomDelay() {
  return Math.floor(Math.random() * 1000) + 200
}
