import { PrismaClient } from "@prisma/client";

const is_admin = async (req, res, next) => {
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: req.user.id,
        role: "ADMIN",
      },
    });
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  next();
};

export default is_admin;
