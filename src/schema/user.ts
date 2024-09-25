import { z } from "zod"

export const userSchema = {
  update: z.object({
    quantity: z.number().positive(),
  }),
}

export type UpdateUserRequest = z.infer<typeof userSchema.update>
