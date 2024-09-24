import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

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

export const productRouter = createTRPCRouter({
  createProduct: publicProcedure
    .input(productSchema.create)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.create({
        data: input,
      })
    }),

  getProducts: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findMany()
  }),

  getProduct: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findFirst({
        where: {
          id: input,
        },
      })
    }),

  updateProduct: publicProcedure
    .input(productSchema.update)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateWithoutId } = input
      return ctx.db.product.update({
        where: {
          id,
        },
        data: updateWithoutId,
      })
    }),

  deleteProduct: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.delete({
        where: {
          id: input,
        },
      })
    }),
})
