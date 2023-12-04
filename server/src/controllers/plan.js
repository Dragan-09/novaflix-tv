const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getPlans = async (req, res) => {
  const plans = await prisma.plan.findMany();
  return res.status(200).json({ data: plans });
};

module.exports = { getPlans };
