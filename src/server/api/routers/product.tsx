import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

const userSchema = {
  create: z.object({
    name: z.string(),
    image: z.string(),
    priceInGold: z.number(),
  }),

  update: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    priceInGold: z.number(),
  }),
}

export const productRouter = createTRPCRouter({
  createProduct: publicProcedure
    .input(userSchema.create)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.product.create({
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
    .input(userSchema.update)
    .query(async ({ ctx, input }) => {
      const { id, ...updateWithoutId } = input
      return ctx.db.product.update({
        where: {
          id: input.id,
        },
        data: updateWithoutId,
      })
    }),

  deleteProduct: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.product.delete({
        where: {
          id: input,
        },
      })
    }),
})
