require("dotenv").config();
const transporter = require("./transporter");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const notifyAdminWithPurchase = async (user_id, plan_name, plan_type) => {
  const user = await prisma.user.findFirst({
    where: { id: user_id },
  });

  const notify = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: ["ismailpipas@gmail.com", "nejjariothman@gmail.com"],
    subject: "Purchase Notification",
    text: `A sidi, <b>${user.username}</b> rah khda ${
      plan_type == "TRIAL" ? "free trial" : ""
    } ${plan_name} plan. activer lih l massa2il diyalo. matnssach!`,
  });

  return notify;
};

module.exports = { notifyAdminWithPurchase };
