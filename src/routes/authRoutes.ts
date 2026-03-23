import { Router } from "express";
import { prisma } from "../prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { body } from "express-validator";
import { signupController } from "../controllers/signupController.js";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //Se genera el token JWT
  const token = generateToken({
    id: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: {
        email,
      },
      token,
    },
  });
});

authRouter.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  signupController,
);
export default authRouter;
