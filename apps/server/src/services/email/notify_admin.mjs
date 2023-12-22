import transporter from "./transporter.mjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const notifyAdminWithPurchase = async (
  user_id,
  plan_name,
  plan_type,
  subscription_uuid
) => {
  const user = await prisma.user.findFirst({
    where: { id: parseInt(user_id) },
  });

  const notify = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: ["ismailpipas@gmail.com"],
    subject: "Purchase Notification",
    html: `A sidi, <b>${user.username}</b> rah khda ${
      plan_type == "TRIAL" ? "free trial" : ""
    } ${plan_name} plan. activer lih l massa2il diyalo. matnssach! dkhel l had link: ${
      process.env.FRONTEND_URL
    }/admin/user/credentials/${subscription_uuid}`,
  });

  return notify;
};

export { notifyAdminWithPurchase };
