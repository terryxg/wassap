import z from "zod";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const registerSchema = loginSchema
  .extend({
    phone_number: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    confirm_password: z.string(),
    newsletter: z.boolean(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "passwords do not match",
    path: ["cponfirm_password"],
  });
