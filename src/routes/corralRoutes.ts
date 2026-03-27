import { Router } from "express";
import { authorization } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const corralRouter = Router();

corralRouter.get("/", authorization, authorizeRole("ADMIN"), (req, res) => {
  res.json({ message: "Corral route is working!" });
});

export default corralRouter;
