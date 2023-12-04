const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCategories = async (rea, res) => {
  const categories = await prisma.category.findMany();
  return res.status(200).json({ data: categories });
};

module.exports = { getCategories };
