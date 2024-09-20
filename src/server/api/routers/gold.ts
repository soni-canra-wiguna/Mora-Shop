import { z } from "zod"
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc"

export const goldRouter = createTRPCRouter({
  getGolds: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.gold.findMany({
      where: {
        userId: input,
      },
    })
  }),

  create: privateProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.gold.create({
        data: {
          quantity: input,
        },
      })
    }),
})
