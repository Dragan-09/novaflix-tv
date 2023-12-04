const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();
const jwt_secret = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  // secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const register = async (req, res) => {
  const {
    username,
    email,
    first_name,
    last_name,
    password,
    password_confirmation,
  } = req.body;
  if (
    username &&
    email &&
    first_name &&
    last_name &&
    password &&
    password_confirmation
  ) {
    const userWithEmail = await prisma.user.findFirst({ where: { email } });
    const userWithUsername = await prisma.user.findFirst({
      where: { username },
    });

    if (userWithUsername) {
      return res
        .status(400)
        .json({ message: "This username is already taken!" });
    }
    if (userWithEmail) {
      return res.status(400).json({ message: "This email is already taken!" });
    }
    if (password !== password_confirmation) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords don't match" });
    }

    try {
      const hashed_password = bcrypt.hashSync(password);
      const oneHourLater = new Date(
        new Date().getTime() + 60 * 60 * 1000
      ).toISOString();

      const create = await prisma.user.create({
        data: {
          username,
          email,
          first_name,
          last_name,
          password: hashed_password,
        },
      });

      const storeVerification = await prisma.userVerification.create({
        data: {
          user_id: create.id,
          expires_at: oneHourLater,
        },
      });

      const verify = await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: create.email,
        subject: "Email Verification",
        text: `This is your verfication url: http://localhost:3307/api/user/verify/${storeVerification.encrypted_string}`,
      });

      return res.status(201).json({
        message:
          "Account Created, a confirmation email sent to your email address.",
        data: verify,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Something went wrong!" });
    }
  }

  return res
    .status(400)
    .json({ success: false, message: "Make sure to fill all fields!" });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const user = await prisma.user.findFirst({ where: { username } });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials!",
      });

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        jwt_secret,
        { expiresIn: "10d" }
      );
      return res.status(200).json({
        user,
        token,
      });
    }
  }

  return res.status(400).json({
    success: false,
    message: "Make sure to fill all the fields!",
  });
};

const account = async (req, res) => {
  const { id, username } = req.user;
  const now = new Date().toISOString();
  const user = await prisma.user.findFirst({
    where: { id },
    select: {
      username: true,
      first_name: true,
      last_name: true,
      plans: {
        orderBy: { assigned_at: "desc" },
        select: {
          ends_at: true,
          status: true,
          plan: { select: { name: true, duration_days: true } },
        },
        where: { ends_at: { gt: now } },
      },
    },
  });
  if (!user)
    return res.status(400).json({ message: "This user does not exist!" });
  return res.status(200).json({ data: user });
};

module.exports = {
  register,
  login,
  account,
};
