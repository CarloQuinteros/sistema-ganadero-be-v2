import { z } from "zod";

export const animalSchema = z.object({
  category: z.enum([
    "ternero",
    "novillo",
    "vaca",
    "toro",
    "vaquillona",
    "vaquilla",
    "desmamante",
  ]),
  sex: z.enum(["macho", "hembra"]).default("macho"),
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
  price: z.coerce.number().min(0, "El precio no puede ser negativo").optional(),
  purchaseDate: z.string().nullable().optional(),

  entryDate: z.string(),

  earTag: z.coerce
    .number()
    .int("Debe ser un numero entero")
    .min(1, { message: "Numero de caravana es requerido" }),
  purpose: z.enum(["leche", "carne", "reproduccion", "doble proposito"]),
  ageAtEntry: z.coerce.number().int().min(0, "La edad no puede ser negativa"),
  corralId: z.string().uuid().nullable().optional(),
  providerId: z.string().uuid().nullable().optional(),
  targetWeight: z.coerce.number().default(1.4),
  priceType: z.enum(["POR_PUNTA", "POR_KILO"]).default("POR_PUNTA"),
});

export const updateAnimalSchema = animalSchema.partial({
  price: true,
  purchaseDate: true,
});

export const categoryOptions = animalSchema.shape.category.options;
export const breedOptions = animalSchema.shape.breed.options;
export const purposeOptions = animalSchema.shape.purpose.options;
export type AnimalFormValues = z.infer<typeof animalSchema>;
export type UpdateAnimalFormValues = z.infer<typeof updateAnimalSchema>;
