import { z } from 'zod'

export const createProductSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  price: z.string().min(1),
  stock: z.string().min(1)
})

export type CreateProductSchema = z.infer<typeof createProductSchema>
