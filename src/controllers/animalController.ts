import { Request, Response } from "express";

export const uploadAnimalImage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "No se ha subido ningún archivo",
      });
      return;
    }

    const imageUrl = `/upload/animals/${req.file.filename}`;
    res.json({
      success: true,
      data: { imageUrl },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Error al subir la imagen",
    });
  }
};
