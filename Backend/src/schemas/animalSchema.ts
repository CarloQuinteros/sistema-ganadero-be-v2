import { z } from "zod";

export const createAnimalSchema = z.object({
  category: z.enum([
    "ternero",
    "novillo",
    "vaca",
    "toro",
    "vaquillona",
    "vaquilla",
    "desmamante",
  ]),
  sex: z.enum(["macho", "hembra"]),
  breed: z.enum([
    "holstein",
    "jersey",
    "angus",
    "hereford",
    "brahman",
    "simental",
    "nelore",
    "gir",
    "guzerat",
  ]),
  weightAtEntry: z.coerce
    .number()
    .min(20, "El peso no puede ser menos que 20Kg"),
  price: z.coerce.number().min(0, "El precio no puede ser negativo"),
  entryDate: z.coerce.date("Debe seleccionar una fecha de ingreso del animal"),
  purchaseDate: z.coerce.date().nullable(),

  earTag: z.coerce
    .number()
    .int("Debe ser un numero entero")
    .min(1, { message: "Numero de caravana es requerido" }),
  purpose: z.enum(["leche", "carne", "reproduccion", "doble_proposito"]),
  ageAtEntry: z.coerce.number().int().min(0, "La edad no puede ser negativa"),
  corralId: z.string().uuid().optional(),
  providerId: z.string().uuid().optional(),
  targetWeight: z.coerce.number().default(1.4),
  priceType: z.enum(["POR_PUNTA", "POR_KILO"]).default("POR_PUNTA"),
});

export const updateAnimalSchema = createAnimalSchema.partial();
