import {z} from "zod"

export const messageSchema = z.object({
    id: z.string(),
    content: z.string(),
    isUserMessage: z.boolean()
})

// array validator (for array of our zod objects we specified)
export const messageArraySchema = z.array(messageSchema)

export type Message = z.infer<typeof messageSchema>