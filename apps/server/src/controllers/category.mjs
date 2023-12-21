import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCategories = async (req, res) => {
  const categories = await prisma.category.findMany();
  return res.status(200).json({ data: categories });
};

export { getCategories };
