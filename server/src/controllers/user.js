const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const jwt_secret = process.env.JWT_SECRET;

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
      return res.status(400).json({
        success: false,
        message: "This username is already taken!",
      });
    }
    if (userWithEmail) {
      return res.status(400).json({
        success: false,
        message: "This email is already taken!",
      });
    }
    if (password !== password_confirmation) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords don't match" });
    }

    const hashed_password = bcrypt.hashSync(password);
    const insert = await prisma.user.create({
      data: {
        username,
        email,
        first_name,
        last_name,
        password: hashed_password,
      },
    });

    return res.status(201).json(insert);
  }

  return res
    .status(400)
    .json({ success: false, message: "Make sure to fill all fields!" });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const user = await prisma.user.findFirst({ where: { username } });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          {
            user_id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
          },
          jwt_secret
        );
        return res.status(200).json({
          user,
          token,
        });
      }
    }
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials!",
    });
  }

  return res.status(400).json({
    success: false,
    message: "Make sure to fill all the fields!",
  });
};

module.exports = {
  register,
  login,
};
