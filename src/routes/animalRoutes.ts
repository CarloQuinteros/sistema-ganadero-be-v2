import { Router } from "express";
import { authorization } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";
import { validateImage } from "../middleware/validateImageMiddleware.js";
import upload from "../middleware/animalUploadMiddleware.js";
import { uploadAnimalImage } from "../controllers/animalController.js";

const animalRouter = Router();

animalRouter.get("/", authorization, authorizeRole("ADMIN"), (req, res) => {
  res.json({ message: "Animal route is working!" });
});

animalRouter.post(
  "/upload",
  authorization,
  authorizeRole("ADMIN"),
  upload.single("image"),
  validateImage,
  uploadAnimalImage,
);

export default animalRouter;
