import { z } from "zod";

export const  loginValidationSchema=z.object({
    email:z.string().email("Please enter your email address!"),
    password:z.string().min(6,"Must be at least 6 characters")
  })