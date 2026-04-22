import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AnimalFormValues } from "@/schemas/animalSchema";
import {
  animalSchema,
  breedOptions,
  categoryOptions,
  purposeOptions,
} from "@/schemas/animalSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

function AnimalFormModal({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<AnimalFormValues>({
    resolver: zodResolver(animalSchema),
  });

  const onSubmit = (data: AnimalFormValues) => {
    console.log(data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* INPUT CON FIELD */}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="eartag">Numero de caravana</FieldLabel>

            <Input
              id="eartag"
              {...register("earTag")}
              placeholder="Ej:12345"
              required
            />

            <FieldError>{errors.earTag?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="breed">Raza</FieldLabel>
            <Controller
              name="breed"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger id="breed">
                    <SelectValue placeholder="Selecciona la raza" />
                  </SelectTrigger>
                  <SelectContent>
                    {breedOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError>{errors.breed?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="category">Categoría</FieldLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecciona la categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError>{errors.category?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="weight">Peso al entrar</FieldLabel>

            <Input
              id="weight"
              {...register("weightAtEntry")}
              placeholder="Ej:500"
              type="number"
              step="0.1"
            />
            <FieldError>{errors.weightAtEntry?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="price">Precio</FieldLabel>

            <Input
              id="price"
              {...register("price")}
              placeholder="Ej:1000"
              type="number"
              step="0.1"
            />
            <FieldError>{errors.price?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="purchaseDate">Fecha de compra</FieldLabel>

            <Input
              id="purchaseDate"
              {...register("purchaseDate")}
              placeholder="Ej:2023-01-01"
              type="date"
            />
            <FieldError>{errors.purchaseDate?.message}</FieldError>
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="entryDate">Fecha de ingreso</FieldLabel>

            <Input
              id="entryDate"
              {...register("entryDate")}
              placeholder="Ej:2023-01-01"
              type="date"
            />
            <FieldError>{errors.entryDate?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="purpose">Proposito</FieldLabel>
            <Controller
              name="purpose"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger id="purpose">
                    <SelectValue placeholder="Selecciona el propósito" />
                  </SelectTrigger>
                  <SelectContent>
                    {purposeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError>{errors.breed?.message}</FieldError>
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="ageAtEntry">Edad al entrar</FieldLabel>

            <Input
              id="ageAtEntry"
              {...register("ageAtEntry")}
              placeholder="Ej:2"
              type="number"
              step="1"
            />
            <FieldError>{errors.ageAtEntry?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="targetWeight">Peso objetivo</FieldLabel>

            <Input
              id="targetWeight"
              {...register("targetWeight")}
              placeholder="Ej:1.4"
              type="number"
              step="0.1"
            />
            <FieldError>{errors.targetWeight?.message}</FieldError>
          </Field>
        </FieldGroup>
      </div>
      <Button disabled={isSubmitting} type="submit" className="w-full">
        {isSubmitting ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}

export default AnimalFormModal;
