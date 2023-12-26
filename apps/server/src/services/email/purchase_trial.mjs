import generate_template from "./template.mjs";
import transporter from "./transporter.mjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const purchase_trial = async (email, plan_id, subscription_type, user_id) => {
  try {
    const user = user_id
      ? await prisma.user.findFirstOrThrow({
          where: {
            id: parseInt(user_id),
          },
        })
      : undefined;

    const plan = await prisma.plan.findFirstOrThrow({
      where: {
        id: parseInt(plan_id),
      },
    });

    const username = user_id ? user.username : email.split("@")[0];

    const content = generate_template(
      subscription_type == "TRIAL" ? "trial" : "purchase",
      {
        user: { username },
        plan_name: subscription_type != "TRIAL" ? plan.name : undefined,
        brand: "Televista",
        base_url: process.env.FRONTEND_URL,
      },
    );

    const sendEmail = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
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

export default purchase_trial;
