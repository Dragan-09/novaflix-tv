import { PrismaClient } from "@prisma/client";
import transporter from "./transporter.mjs";
import generate_template from "./template.mjs";

// const require = createRequire(import.meta.url);
// const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const verify = async (user_id) => {
  const oneHourLater = new Date(
    new Date().getTime() + 60 * 120 * 1000,
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

    const content = generate_template("verification", {
      user: {
        username: user.username,
      },
      brand: "Televista",
      link: `${process.env.FRONTEND_URL}/auth/confirm/${storeVerification.encrypted_string}`,
    });

    const verify = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: user.email,
      subject: "Email Verification",
      html: content,
      headers: {
        "X-Gmail-Labels": "Updates", // Set the category to 'Updates'
      },
    });

    return verify;
  }
};

export default verify;
