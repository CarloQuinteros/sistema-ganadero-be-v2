import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// se creara un usuario admin por defecto para poder ingresar al sistema.
async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const existingUser = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (existingUser) {
    console.log("Usuario de prueba ya existe");
    return;
  }

  const newUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log(
    `Usuario de prueba creado: ${newUser.email} Role:${newUser.role}`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
