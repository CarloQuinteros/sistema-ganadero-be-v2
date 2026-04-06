import { Router } from "express";
import { authorization } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";
import { createCorralSchema } from "../schemas/corralSchema.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { createCorral } from "../controllers/corralController.js";

const corralRouter = Router();

corralRouter.get("/", authorization, authorizeRole("ADMIN"), (req, res) => {
  res.json({ message: "Corral route is working!" });
});

corralRouter.post(
  "/",
  authorization,
  authorizeRole("ADMIN"),
  validateSchema(createCorralSchema),
  createCorral,
);

export default corralRouter;
