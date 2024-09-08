import { z } from "zod";

export const loginform = z.object({
  email: z.string().email("Enter a valid email").min(1, "Enter a valid email"),
  password: z.string().min(1, "Password should be there"),
});
