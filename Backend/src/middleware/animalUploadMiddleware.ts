import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    const uploadPath = path.join(process.cwd(), "upload", "animals");

    try {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
    } catch (error) {
      return cb(error as Error, uploadPath);
    }
    cb(null, uploadPath);
  },

  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + "-";
    const extension = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, extension);

    cb(null, `${nameWithoutExt}-${uniqueSuffix}${extension}`);
    console.log(uniqueSuffix);
    console.log(extension);
    console.log(nameWithoutExt);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/jpg",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG, GIF y JPG.",
      ),
    );
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
  files: 1,
};

const upload = multer({ storage, fileFilter, limits });

export default upload;
