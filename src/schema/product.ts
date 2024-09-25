import { z } from "zod"

export const productSchema = {
  create: z.object({
    name: z.string(),
    image: z.string(),
    priceInGold: z.coerce.number(),
  }),

  update: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    priceInGold: z.coerce.number(),
  }),
}

export type CreateProductRequest = z.infer<typeof productSchema.create>
export type UpdateProductRequest = z.infer<typeof productSchema.update>
