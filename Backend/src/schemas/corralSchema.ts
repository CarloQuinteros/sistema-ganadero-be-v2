import { z } from "zod";

export const createCorralSchema = z.object({
  corralNumber: z.coerce
    .number()
    .int()
    .min(1, "El número de corral debe ser un entero positivo"),
});
