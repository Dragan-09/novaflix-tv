import transporter from "./transporter.mjs";
import generate_template from "./template.mjs";

const active_subscription = async (
  email,
  username,
  plan_name,
  sub_username,
  sub_password
) => {
  const content = await generate_template("credentials", {
    user: { username: username },
    account: {
      username: sub_username,
      password: sub_password,
    },
    brand: "Televista",
    base_url: process.env.FRONTEND_URL,
  });

  const sendEmail = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Account Credentials Reciept",
    html: content,
  });
};

export default active_subscription;
