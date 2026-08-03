import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string({ message: "Phone number is required" })
    .regex(/^(98|97)\d{8}$/, {
      message: "Phone number must start with 98 or 97 and be 10 digits long",
    }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginInput = z.infer<typeof loginSchema>;