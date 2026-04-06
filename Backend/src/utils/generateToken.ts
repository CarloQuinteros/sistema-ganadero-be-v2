import jwt, { SignOptions } from "jsonwebtoken";

type UserPayload = {
  id: string;
  email: string;
  role: string;
};

export const generateToken = (user: UserPayload) => {
  const payload = { id: user.id, email: user.email, role: user.role };

  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES || ("1d" as any),
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  return token;
};
