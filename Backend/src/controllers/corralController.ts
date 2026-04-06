import { Request, Response } from "express";
import { prisma } from "../prisma.js";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const createCorral = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Usuario no autenticado",
      });
    }
    const data = req.body;

    const newCorral = await prisma.corral.create({
      data: {
        ...data,
      },
    });

    res.status(201).json({
      success: true,
      data: newCorral,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear el corral",
    });
  }
};
