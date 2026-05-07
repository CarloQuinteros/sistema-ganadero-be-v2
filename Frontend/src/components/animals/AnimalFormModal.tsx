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
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { useRef, useState, useEffect } from "react";

import { createAnimal, updateAnimal } from "@/services/AnimalService";

type props = {
  onSuccess: () => void;
  animal?: any;
};

function AnimalFormModal({ onSuccess, animal }: props) {
  const [openPurchase, setOpenPurchase] = useState(false);
  const [openEntry, setOpenEntry] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const getError = (error: any) => error?.message ?? null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(animalSchema),
    mode: "onChange",
    defaultValues: animal
      ? {
          ...animal,
          entryDate: animal.entryDate ? new Date(animal.entryDate) : null,
          purchaseDate: animal.purchaseDate
            ? new Date(animal.purchaseDate)
            : null,
        }
      : {},
  });

  const onSubmit = async (data: AnimalFormValues) => {
    try {
      if (animal) {
        await updateAnimal(animal.id, data);
      } else {
        await createAnimal(data);
      }
      onSuccess();
    } catch (error) {
      console.error("Error creating animal:", error);
    }
  };

  useEffect(() => {
    if (!animal) {
      reset({});
      setPreview(null);
      return;
    }

    if (animal.imageUrl) {
      setPreview(`http://localhost:3000${animal.imageUrl}`);
    }
  }, [animal]);

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
          {errors.earTag?.message && (
            <FieldError className="text-red-500">
              {getError(errors.earTag)}
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
          {errors.breed?.message && (
            <FieldError>{getError(errors.breed)}</FieldError>
          )}
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
          {errors.category?.message && (
            <FieldError>{getError(errors.category)}</FieldError>
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
          {errors.weightAtEntry?.message && (
            <FieldError>{getError(errors.weightAtEntry)}</FieldError>
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
          {errors.price?.message && (
            <FieldError className="text-red-500">
              {getError(errors.price)}
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
          {errors.sex?.message && (
            <FieldError>{getError(errors.sex)}</FieldError>
          )}
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
          {errors.priceType?.message && (
            <FieldError>{getError(errors.priceType)}</FieldError>
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
          {errors.purchaseDate?.message && (
            <FieldError>{getError(errors.purchaseDate)}</FieldError>
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
          {errors.entryDate?.message && (
            <FieldError>{getError(errors.entryDate)}</FieldError>
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
          {errors.purpose?.message && (
            <FieldError>{getError(errors.purpose)}</FieldError>
          )}
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
          {errors.ageAtEntry?.message && (
            <FieldError>{getError(errors.ageAtEntry)}</FieldError>
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
          {errors.targetWeight?.message && (
            <FieldError>{getError(errors.targetWeight)}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Imagen</FieldLabel>
          <Input
            ref={fileRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("image", file);
                setPreview(URL.createObjectURL(file));
              }
            }}
            className="hidden"
          />
          {preview && (
            <img src={preview} className="w-32 h-32 object-cover rounded-md" />
          )}
          {errors.image?.message && (
            <FieldError>{getError(errors.image)}</FieldError>
          )}
          <Button type="button" onClick={() => fileRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Subir Imagen
          </Button>
        </Field>
      </div>
      <Button type="submit" className="w-full">
        Guardar
      </Button>
    </form>
  );
}

export default AnimalFormModal;
