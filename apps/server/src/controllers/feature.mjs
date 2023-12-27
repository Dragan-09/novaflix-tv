import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const features = async (req, res) => {
  const _features = await prisma.feature.findMany({
    select: {
      name: true,
      icon: true,
    },
  });

  return res.status(200).json({
    data: _features,
  });
};

export default features;
