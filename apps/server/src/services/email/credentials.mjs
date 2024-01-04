import Redis from "ioredis";
import transporter from "./transporter.mjs";
import { PrismaClient } from "@prisma/client";
import generate_template from "./template.mjs";

const sendCredentials = async () => {
  const prisma = new PrismaClient();
  const redis = new Redis(process.env.REDIS_URL || undefined);

  redis.subscribe("credentials_stored", (error) => {
    error && console.log(`Something went wrong: ${error}`);

    redis.on("message", async (channel, message) => {
      if (channel == "credentials_stored") {
        const userCredentials = JSON.parse(message);
        console.log(userCredentials);
        try {
          const user = userCredentials.user_id
            ? await prisma.user.findFirstOrThrow({
                where: {
                  id: userCredentials.user_id,
                },
              })
            : undefined;

          const username = user
            ? user.username
            : userCredentials.email.split("@")[0];

          const content = generate_template("credentials", {
            user: { username },
            account: {
              login: userCredentials.sub_username,
              password: userCredentials.sub_password,
            },
            brand: "Televista",
            base_url: process.env.FRONTEND_URL,
          });

          const sendEmail = await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: userCredentials.email,
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
