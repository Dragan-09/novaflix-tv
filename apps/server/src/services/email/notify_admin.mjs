import transporter from "./transporter.mjs";
import { PrismaClient } from "@prisma/client";

// const require = createRequire(import.meta.url);
// const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const notifyAdminWithPurchase = async (
  email,
  plan_name,
  plan_type,
  subscription_uuid,
  user_id,
) => {
  const user = user_id
    ? await prisma.user.findFirst({
        where: { id: parseInt(user_id) },
      })
    : undefined;

  // const subscription = await prisma.plansOnUsers.findFirst({
  //   where: {
  //     uuid: subscription_uuid,
  //   },
  //   select: {
  //     plan: true,
  //   },
  // });

  const notify = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: ["ismailpipas@gmail.com"],
    subject: "Purchase Notification",
    html: `A sidi, <b>${user ? user.username : email}</b> rah khda ${
      plan_type == "TRIAL" ? "free trial" : plan_name
    } ${plan_name} plan. activer lih l massa2il diyalo. matnssach! dkhel l had link: ${
      process.env.FRONTEND_URL
    }/admin/user/credentials/${subscription_uuid}`,
  });

  return notify;
};

export { notifyAdminWithPurchase };
