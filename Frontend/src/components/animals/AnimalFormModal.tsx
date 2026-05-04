import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AnimalFormValues } from "@/schemas/animalSchema";
import {
  animalSchema,
  breedOptions,
  categoryOptions,
  purposeOptions,
  sexOptions,
  priceTypeOptions,
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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

import { createAnimal } from "@/services/AnimalService";

function AnimalFormModal({ onSuccess }: { onSuccess: () => void }) {
  const [openPurchase, setOpenPurchase] = useState(false);
  const [openEntry, setOpenEntry] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(animalSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: AnimalFormValues) => {
    try {
      await createAnimal(data);
      onSuccess();
    } catch (error) {
      console.error("Error creating animal:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field>
          <FieldLabel htmlFor="earTag">Numero de caravana</FieldLabel>
          <Input
            {...register("earTag", { valueAsNumber: true })}
            id="earTag"
            placeholder="12345"
            autoComplete="off"
          />
          {errors.earTag && (
            <FieldError className="text-red-500">
              {errors.earTag?.message}
            </FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="breed">Raza</FieldLabel>
          <Controller
            name="breed"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger id="breed">
                  <SelectValue placeholder="Selecciona la raza" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom" align="start">
                  {breedOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.breed && <FieldError>{errors.breed?.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="category">Categoría</FieldLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecciona la categoría" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom" align="start">
                  {categoryOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <FieldError>{errors.category?.message}</FieldError>
          )}
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
          {errors.weightAtEntry && (
            <FieldError>{errors.weightAtEntry?.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="price">Precio</FieldLabel>
          <Input
            {...register("price", { valueAsNumber: true })}
            id="price"
            placeholder="12345"
            autoComplete="off"
          />
          {errors.price && (
            <FieldError className="text-red-500">
              {errors.price?.message}
            </FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="sex">Sexo</FieldLabel>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger id="sex">
                  <SelectValue placeholder="Selecciona el sexo" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom" align="start">
                  {sexOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.sex && <FieldError>{errors.sex?.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="priceType">Tipo de Precio</FieldLabel>
          <Controller
            name="priceType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger id="priceType">
                  <SelectValue placeholder="Selecciona el tipo de precio" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom" align="start">
                  {priceTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.priceType && (
            <FieldError>{errors.priceType?.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="purchaseDate">Fecha de compra</FieldLabel>

          <Controller
            name="purchaseDate"
            control={control}
            render={({ field }) => (
              <Popover open={openPurchase} onOpenChange={setOpenPurchase}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-between ${!field.value && "text-muted-foreground"}`}
                  >
                    {field.value
                      ? format(field.value, "dd/MM/yyyy")
                      : "Selecciona una fecha"}
                    <CalendarIcon className="w-4 h-4 opacity-60" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                  side="bottom"
                >
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      field.onChange(date ?? null);
                      setOpenPurchase(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.purchaseDate && (
            <FieldError>{errors.purchaseDate?.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="entryDate">Fecha de ingreso</FieldLabel>

          <Controller
            name="entryDate"
            control={control}
            render={({ field }) => (
              <Popover open={openEntry} onOpenChange={setOpenEntry}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-between ${!field.value && "text-muted-foreground"}`}
                  >
                    {field.value
                      ? format(field.value, "dd/MM/yyyy")
                      : "Selecciona una fecha"}
                    <CalendarIcon className="w-4 h-4 opacity-60" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                  side="bottom"
                >
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      field.onChange(date ?? null);
                      setOpenEntry(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.entryDate && (
            <FieldError>{errors.entryDate?.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="purpose">Proposito</FieldLabel>
          <Controller
            name="purpose"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger id="purpose">
                  <SelectValue placeholder="Selecciona el propósito" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom" align="start">
                  {purposeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.purpose && <FieldError>{errors.purpose?.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="ageAtEntry">Edad al entrar(en meses)</FieldLabel>

          <Input
            id="ageAtEntry"
            {...register("ageAtEntry")}
            placeholder="Ej:2"
            type="number"
            step="1"
          />
          {errors.ageAtEntry && (
            <FieldError>{errors.ageAtEntry?.message}</FieldError>
          )}
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
          {errors.targetWeight && (
            <FieldError>{errors.targetWeight?.message}</FieldError>
          )}
        </Field>
      </div>
      <Button type="submit" className="w-full">
        Guardar
      </Button>
    </form>
  );
}

export default AnimalFormModal;
