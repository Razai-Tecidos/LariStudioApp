import { z } from "zod";

export const clientCreateSchema = z.object({
  name: z.string().trim().min(3, { message: "Nome deve ter no minimo 3 caracteres." }),
  phone: z
    .string()
    .trim()
    .min(8, { message: "Telefone invalido." })
    .max(20, { message: "Telefone invalido." }),
  notes: z.string().trim().max(1000).optional().nullable(),
});

export const clientUpdateSchema = clientCreateSchema.partial().refine(
  (payload) => Object.keys(payload).length > 0,
  {
    message: "Informe pelo menos um campo para atualizar.",
  },
);

export type ClientCreateSchemaInput = z.infer<typeof clientCreateSchema>;
export type ClientUpdateSchemaInput = z.infer<typeof clientUpdateSchema>;
