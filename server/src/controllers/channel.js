const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getChannels = async (req, res) => {
  const channels = await prisma.channel.findMany();
  return res.status(200).json({ data: channels });
};

module.exports = { getChannels };
