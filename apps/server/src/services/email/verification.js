const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

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

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      // secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const verify = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: user.email,
      subject: "Email Verification",
      text: `This is your verfication url: ${process.env.FRONTEND_URL}/auth/confirm/${storeVerification.encrypted_string}`,
    });

    return verify;
  }
};

module.exports = verify;
