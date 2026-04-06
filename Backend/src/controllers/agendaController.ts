import { Request, Response } from "express";
import { prisma } from "../prisma.js";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const createAgenda = async (
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

    const newAgenda = await prisma.agenda.create({
      data: {
        ...data,
      },
    });
    res.status(201).json({
      success: true,
      message: "Agenda creada exitosamente",
      data: newAgenda,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear la agenda",
    });
  }
};
