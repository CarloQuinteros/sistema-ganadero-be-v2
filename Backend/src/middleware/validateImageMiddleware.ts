import { Request, Response, NextFunction } from "express";

export const validateImage = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No se ha proporcionado una imagen.",
      });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message:
          "Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG, GIF y JPG.",
      });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: "El tamaño del archivo excede el límite de 5MB.",
      });
    }

    if (req.file.size === 0) {
      return res.status(400).json({
        success: false,
        message: "El archivo está vacío.",
      });
    }

    next();
  } catch (error) {
    console.error("Error al validar la imagen:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor al validar la imagen.",
    });
  }
};
