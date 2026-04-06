import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateSchema =
  (
    schema: ZodTypeAny, // Cambio aquí
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues,
      });
    }

    // Opcional: Esto asegura que req.body tenga solo los datos validados
    req.body = result.data;
    next();
  };
