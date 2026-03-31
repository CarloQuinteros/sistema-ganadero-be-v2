import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import { success } from "zod";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const createAnimal = async (
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

    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "No se ha subido ningún archivo",
      });
      return;
    }

    const imageUrl = `/upload/animals/${req.file.filename}`;

    const data = req.body;

    const { corralId, providerId, ...animalData } = data;
    const newAnimal = await prisma.animal.create({
      data: {
        ...animalData,
        corral: data.corralId ? { connect: { id: data.corralId } } : undefined,
        imageUrl: imageUrl || "upload/animals/default.jpg",
        provider: data.providerId
          ? { connect: { id: data.providerId } }
          : undefined,
        isActive: data.isActive ?? true,
        createdById: userId,
        updatedById: userId,
      },
    });

    res.status(201).json({
      success: true,
      data: newAnimal,
    });
  } catch (error) {
    console.error("Error al crear el animal:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear el animal",
    });
  }
};
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

export const getAnimals = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      category,
      sex,
      breed,
      purpose,
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const filters: any = {};

    if (category) filters.category = category;
    if (sex) filters.sex = sex;
    if (breed) filters.breed = breed;
    if (purpose) filters.purpose = purpose;

    const [animals, total] = await Promise.all([
      prisma.animal.findMany({
        where: filters,
        skip,
        take: limitNumber,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.animal.count({
        where: filters,
      }),
    ]);

    res.json({
      success: true,
      data: animals,
      meta: {
        total,
        page: pageNumber,
        lastPage: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener animales",
    });
  }
};
export const getAnimalById = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      res.status(404).json({
        sucess: false,
        message: "Usuario no encontrado",
      });
    }

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        sucess: false,
        message: "ID invalido",
      });
    }

    const getAnimal = await prisma.animal.findUnique({
      where: { id },
    });

    if (!getAnimal) {
      res.status(404).json({
        sucess: false,
        message: "Animal no encontrado",
      });
    }

    res.status(201).json({
      success: true,
      data: getAnimal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el animal",
    });
  }
};
export const updateAnimal = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Usuario no autenticado",
      });
      return;
    }

    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        sucess: false,
        message: "ID invalido",
      });
    }
    const data = req.body;

    const animal = await prisma.animal.findUnique({ where: { id } });

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: "Animal no encontrado",
      });
    }

    const { corralId, providerId, ...animalData } = data;

    const updatedAnimal = await prisma.animal.update({
      where: { id },
      data: {
        ...animalData,
        ...(corralId !== undefined && {
          corral:
            corralId === null
              ? { disconnect: true }
              : { connect: { id: corralId } },
        }),
        ...(providerId !== undefined && {
          provider:
            providerId === null
              ? { disconnect: true }
              : { connect: { id: providerId } },
        }),
        updatedById: req.user.id,
      },
    });
    res.status(200).json({
      success: true,
      data: updatedAnimal,
    });
  } catch (error) {
    console.error("Error al actualizar el animal:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el animal",
    });
  }
};
export const deleteAnimal = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        sucess: false,
        message: "ID invalido",
      });
    }

    await prisma.animal.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Animal eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar",
    });
  }
};

export const getAnimalByEarTag = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const eartag = Number(req.params.eartag);
    const userId = req.user?.id;
    if (!userId) {
      res.status(404).json({
        sucess: false,
        message: "Usuario no encontrado",
      });
    }

    const animalByEarTag = await prisma.animal.findFirst({
      where: { earTag: eartag },
    });

    if (!animalByEarTag) {
      return res.status(404).json({
        success: false,
        message: "Caravana no encontrada",
      });
    }

    res.json({
      success: true,
      data: animalByEarTag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al buscar el numero de caravana",
    });
  }
};
