import Redis from "ioredis";
import transporter from "./transporter.mjs";
import { PrismaClient } from "@prisma/client";
import { createRequire } from "module";
import generate_template from "./template.mjs";

// const require = createRequire(import.meta.url);
// const { PrismaClient } = require("@prisma/client");

const sendCredentials = async () => {
  const prisma = new PrismaClient();
  const redis = new Redis();

  redis.subscribe("credentials_stored", (error) => {
    error && console.log(`Something went wrong: ${error}`);

    redis.on("message", async (channel, message) => {
      if (channel == "credentials_stored") {
        const userCredentials = JSON.parse(message);

        try {
          const user = await prisma.user.findFirstOrThrow({
            where: {
              id: userCredentials.user_id,
            },
          });

          const content = generate_template("credentials", {
            user: { username: user.username },
            account: {
              login: userCredentials.sub_username,
              password: userCredentials.sub_password,
            },
            brand: "Televista",
            base_url: process.env.FRONTEND_URL,
          });

          const sendEmail = await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: user.email,
            subject: `Credentials Reciept`,
            html: content,
          });

          const confirm = await prisma.credentials.update({
            where: {
              subscription_uuid: userCredentials.subscription_uuid,
            },
            data: {
              email_sent: true,
            },
          });

          const activate = await prisma.plansOnUsers.update({
            where: {
              uuid: userCredentials.subscription_uuid,
            },
            data: {
              status: "ACTIVE",
            },
          });
        } catch (error) {
          console.log("Something went wrong!", error);
        }
      }
    });
  });
};

export default sendCredentials;
