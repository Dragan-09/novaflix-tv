const generate_template = require("./template");
const transporter = require("./transporter");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

const purchase_trial = async (user_id, plan_id, subscription_type) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: parseInt(user_id),
      },
    });

    const plan = await prisma.plan.findFirstOrThrow({
      where: {
        id: parseInt(plan_id),
      },
    });

    const content = generate_template(
      subscription_type == "TRIAL" ? "trial" : "purchase",
      {
        user: { username: user.username },
        plan_name: subscription_type != "TRIAL" ? plan.name : undefined,
        brand: "Televista",
        base_url: process.env.FRONTEND_URL,
      }
    );

    const sendEmail = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: user.email,
      subject: `${
        subscription_type == "TRIAL" ? "Free Trial" : `${plan.name} Plan`
      } Reciept`,
      html: content,
    });

    return sendEmail;
  } catch (error) {
    console.log(error);
  }
};

module.exports = purchase_trial;
