import { z } from "zod";

export const createAgendaSchema = z.object({
  company: z.string().min(1, "El nombre de la empresa es requerido"),
  name: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Correo electrónico inválido").optional(),
  isClient: z.boolean().default(false),
  isProvider: z.boolean().default(false),
  notes: z.string().optional(),
});
