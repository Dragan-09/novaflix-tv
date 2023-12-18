const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const transporter = require("./transporter");

const prisma = new PrismaClient({
  log: [
    {
      level: "query",
    },
  ],
});

const verify = async (user_id) => {
  const oneHourLater = new Date(
    new Date().getTime() + 60 * 120 * 1000
  ).toISOString();

  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: user_id,
    },
  });

  const hasVerification = await prisma.userVerification.findFirst({
    orderBy: { expires_at: "desc" },
    where: { user_id, expires_at: { gt: new Date() } },
  });

  if (!hasVerification) {
    const storeVerification = await prisma.userVerification.create({
      data: {
        user_id: user.id,
        expires_at: oneHourLater,
      },
    });

    const verify = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: user.email,
      subject: "Email Verification",
      html: `This is your verfication link: <a href="${process.env.FRONTEND_URL}/auth/confirm/${storeVerification.encrypted_string}">Verify</a>`,
    });

    return verify;
  }
};

module.exports = verify;
