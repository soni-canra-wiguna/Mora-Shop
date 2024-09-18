import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "./../trpc"

const blogSchema = z.object({
  title: z.string().max(150),
  image: z.string().url(),
  category: z.string(),
  content: z.string().max(5000),
  isPublish: z.boolean().default(true),
})

const updateBlogSchema = z.object({
  id: z.number(),
  title: z.string().max(150),
  image: z.string().url(),
  category: z.string(),
  content: z.string().max(5000),
  isPublish: z.boolean().default(true),
})

export const blogRouter = createTRPCRouter({
  create: publicProcedure.input(blogSchema).mutation(async ({ ctx, input }) => {
    return await ctx.db.blog.create({
      data: input,
    })
  }),

  get: publicProcedure.input(blogSchema).query(async ({ ctx }) => {
    const blogResponse = await ctx.db.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return blogResponse
  }),

  update: publicProcedure
    .input(updateBlogSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...dataWithoutId } = input

      return await ctx.db.blog.update({
        where: {
          id: input.id,
        },
        data: dataWithoutId,
      })
    }),

  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return await ctx.db.blog.delete({
      where: {
        id: input,
      },
    })
  }),
})
