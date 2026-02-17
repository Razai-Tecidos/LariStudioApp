import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Informe um e-mail valido." }),
  password: z.string().min(8, { message: "A senha deve ter ao menos 8 caracteres." }),
});

export type SignInInput = z.infer<typeof signInSchema>;
