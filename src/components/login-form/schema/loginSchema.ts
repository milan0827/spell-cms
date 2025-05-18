import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(4, "Atleast 4 characters are required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, "Atleast 5 characters are required"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
