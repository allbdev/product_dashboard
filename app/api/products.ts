import type { DefaultErrorResponse } from './api.types'
import type { ListProductsResponse, Product } from './products.types'

export const getProducts = async ({
  page,
  limit,
  filter
}: {
  page: number
  limit: number
  filter: string
}): Promise<{
  data: ListProductsResponse
  error?: DefaultErrorResponse
}> => {
  try {
    let response

    if (!filter) {
      response = await fetch(
        `https://dummyjson.com/products?skip=${(page - 1) * limit}&limit=${limit}&delay=${randomDelay()}`
      )
    } else {
      response = await fetch(
        `https://dummyjson.com/products/search?q=${filter}&skip=${(page - 1) * limit}&limit=${limit}&delay=${randomDelay()}`
      )
    }
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

export const createProduct = async (product: Product) => {
  const response = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })

  return response.json()
}
