import { Router } from "express";
import { authorization } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";
import { validateImage } from "../middleware/validateImageMiddleware.js";
import upload from "../middleware/animalUploadMiddleware.js";
import {
  createAnimalSchema,
  updateAnimalSchema,
} from "../schemas/animalSchema.js";
import { validateSchema } from "../middleware/validateSchema.js";
import {
  uploadAnimalImage,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalById,
  getAnimalByEarTag,
  getAnimals,
} from "../controllers/animalController.js";

const animalRouter = Router();

animalRouter.get("/", authorization, authorizeRole("ADMIN"), getAnimals);

animalRouter.post(
  "/",
  authorization,
  authorizeRole("ADMIN"),
  upload.single("image"),
  validateSchema(createAnimalSchema),
  createAnimal,
);

animalRouter.post(
  "/upload",
  authorization,
  authorizeRole("ADMIN"),
  upload.single("image"),
  validateImage,
  uploadAnimalImage,
);

animalRouter.put(
  "/:id",
  authorization,
  authorizeRole("ADMIN"),
  validateSchema(updateAnimalSchema),
  updateAnimal,
);

animalRouter.delete(
  "/:id",
  authorization,
  authorizeRole("ADMIN"),
  deleteAnimal,
);

animalRouter.get("/:id", authorization, authorizeRole("ADMIN"), getAnimalById);
animalRouter.get(
  "/eartag/:eartag",
  authorization,
  authorizeRole("ADMIN"),
  getAnimalByEarTag,
);

export default animalRouter;
