import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

const userSchema = z.object({
  clerkId: z.string(),
  email: z.string().email(),
  gold: z.number().nonnegative(),
})

export const userRouter = createTRPCRouter({
  create: publicProcedure.input(userSchema).mutation(async ({ ctx, input }) => {
    return await ctx.db.user.create({
      data: input,
    })
  }),
})
