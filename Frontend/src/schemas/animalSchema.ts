import * as z from "zod";
export const priceTypeOptions = ["POR_PUNTA", "POR_KILO"] as const;
export const sexOptions = ["macho", "hembra"] as const;
export const categoryOptions = [
  "ternero",
  "novillo",
  "vaca",
  "toro",
  "vaquillona",
  "vaquilla",
  "desmamante",
] as const;

export const breedOptions = [
  "holstein",
  "jersey",
  "angus",
  "hereford",
  "brahman",
  "simental",
  "nelore",
  "gir",
  "guzerat",
] as const;

export const purposeOptions = [
  "leche",
  "carne",
  "reproduccion",
  "doble proposito",
] as const;

export const animalSchema = z.object({
  earTag: z.coerce
    .number("Debe ser un número")
    .int("Numero de caravana debe ser un número entero")
    .positive("Numero de caravana debe ser un número positivo")
    .min(1, "Numero de caravana es requerido"),
  category: z.enum(categoryOptions, "Debe seleccionar una categoría"),
  sex: z.enum(sexOptions, "Debe seleccionar un sexo"),
  breed: z.enum(breedOptions, "Debes seleccionar una raza"),
  weightAtEntry: z.coerce
    .number()
    .min(20, "El peso no puede ser menos que 20Kg")
    .optional(),
  price: z.coerce
    .number("El precio es requerido")
    .min(0, "El precio no puede ser negativo"),
  purchaseDate: z.date().nullable().optional(),
  entryDate: z.date("Debe seleccionar una fecha de ingreso del animal"),
  purpose: z.enum(purposeOptions, "Seleccione un proposito"),
  ageAtEntry: z.coerce
    .number("La edad es requerida")
    .int()
    .min(0, "La edad no puede ser negativa"),
  corralId: z.string().uuid().nullable().optional(),
  providerId: z
    .string()
    .uuid()
    .nullable()
    .default("1e4afaca-4ade-4115-8c64-1ad357c51f3e"),
  targetWeight: z.coerce.number().default(1.4),
  priceType: z.enum(priceTypeOptions).default("POR_PUNTA"),
});

export const updateAnimalSchema = animalSchema.partial({
  price: true,
  purchaseDate: true,
});

export type AnimalFormValues = z.infer<typeof animalSchema>;
export type UpdateAnimalFormValues = z.infer<typeof updateAnimalSchema>;
