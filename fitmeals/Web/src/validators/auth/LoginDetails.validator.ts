import {z} from "zod"
export const verifyLoginDetails = z.object({
    email : z.email(),
    password : z.string().min(6, "Password must be at least 6 characters"),
    role : z.enum(["CUSTOMER","OWNER","DELIVERY","SUPPORT","ADMIN"],"Role is required")
})

export type loginInput = z.infer<typeof verifyLoginDetails>