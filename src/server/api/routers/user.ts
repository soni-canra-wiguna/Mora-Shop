import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

const userSchema = z.object({
  clerkId: z.string(),
  email: z.string().email(),
  gold: z.number().nonnegative(),
})

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.user.findUnique({
      where: {
        clerkId: input,
      },
    })
  }),
})
