import { z } from 'zod';

export const phoneSchema = z
  .string({ message: 'Phone number is required' })
  .trim()
  .min(1, { message: 'Phone number is required' })
  .regex(/^(98|97)\d{8}$/, {
    message: 'Phone number must start with 98 or 97 and be 10 digits long',
  });

export const registerSchema = z.object({
  shopName: z
    .string({ message: 'Shop name is required' })
    .trim()
    .min(2, { message: 'Shop name must be at least 2 characters' })
    .max(100, { message: 'Shop name cannot exceed 100 characters' }),

  fullName: z
    .string({ message: 'Full name is required' })
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(50, { message: 'Full name cannot exceed 50 characters' }),

  phoneNumber: phoneSchema,

  password: z
    .string({ message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(100, { message: 'Password cannot exceed 100 characters' }),
});

export type RegisterInput = z.infer<typeof registerSchema>; 