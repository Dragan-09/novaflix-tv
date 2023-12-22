import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import Joi from "joi";
import verify from "../services/email/verification.mjs";

const prisma = new PrismaClient({
  log: [
    {
      level: "query",
    },
  ],
});
const jwt_secret = process.env.JWT_SECRET;
const now = new Date();
const { hashSync, compareSync } = bcryptjs;

const register = async (req, res) => {
  const schema = Joi.object({
    first_name: Joi.string().required().min(3).max(15).messages({
      "string.empty": "First Name is a required field!",
      "string.required": "First Name is a required field!",
      "string.min": "First Name can't be less than {#limit} characters!",
      "string.max": "First Name can't be nore than {#limit} characters!",
    }),
    last_name: Joi.string().required().min(3).max(10).messages({
      "string.empty": "Last Name is a required field!",
      "string.required": "Last Name is a required field!",
      "string.min": "Last Name can't be less than {#limit} characters!",
      "string.max": "Last Name can't be nore than {#limit} characters!",
    }),
    username: Joi.string().required().min(5).max(15).messages({
      "string.empty": "Username is a required field!",
      "string.required": "Username is a required field!",
      "string.min": "Username can't be less than {#limit} characters!",
      "string.max": "Username can't be nore than {#limit} characters!",
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2, maxDomainSegments: 4 })
      .required()
      .messages({
        "string.empty": "Email is a required field!",
        "string.required": "Email is a required field!",
        "string.email": "Please enter a valid email!",
      }),
    password: Joi.string()
      .required()
      .min(8)
      .max(40)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .messages({
        "string.empty": "Password is a required field!",
        "string.required": "Password is a required field!",
        "string.min": "Password can't be less than {#limit} characters!",
        "string.max": "Password can't be nore than {#limit} characters!",
      }),
    password_confirmation: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "string.empty": "Please confirm the password!",
        "string.required": "Please confirm the password!",
        "any.only": "Passwords don't match!",
      }),
  }).with("password", "password_confirmation");

  try {
    const body = await schema.validateAsync(req.body);
    const { username, email, first_name, last_name, password } = body;

    const userWithEmail = await prisma.user.findFirst({ where: { email } });
    const userWithUsername = await prisma.user.findFirst({
      where: { username },
    });

    if (userWithUsername) {
      return res
        .status(400)
        .json({ messages: ["This username is already taken!"] });
    }

    if (userWithEmail) {
      return res
        .status(400)
        .json({ messages: ["This email is already taken!"] });
    }

    const hashed_password = hashSync(password);

    const create = await prisma.user.create({
      data: {
        username,
        email,
        first_name,
        last_name,
        password: hashed_password,
      },
    });

    const sendEmail = await verify(create.id);

    return res.status(201).json({
      message:
        "Account Created, a confirmation email sent to your email address.",
      data: verify,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ messages: e.details && [...e.details.map((m) => m.message)] });
  }
};

const login = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string()
      .required()
      .max(parseInt(process.env.USERNAME_MAX_LENGTH))
      .messages({
        "string.required": "Login field can't be empty!",
        "string.empty": "Login field can't be empty!",
        "string.max": "Username can't be more than {#limit} characters!",
      }),
    password: Joi.string()
      .required()
      .max(parseInt(process.env.PASSWORD_MAX_LENGTH))
      .messages({
        "string.required": "Password field can't be empty!",
        "string.empty": "Password field can't be empty!",
      }),
  });

  try {
    const body = await schema.validateAsync(req.body);
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({ where: { username } });

    if (!user)
      return res.status(400).json({
        success: false,
        messages: ["Invalid Credentials!"],
      });

    if (compareSync(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        jwt_secret,
        {
          expiresIn: "10d",
        }
      );
      return res.status(200).json({
        user,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      messages: [...error.details.map((m) => m.message)],
    });
  }
};

const account = async (req, res) => {
  const { id, username } = req.user;
  const user = await prisma.user.findFirst({
    where: { id },
    select: {
      username: true,
      first_name: true,
      last_name: true,
      verified: true,
      role: true,
      plans: {
        orderBy: { ends_at: "desc" },
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

  return res.status(200).json({
    data: {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      verified: user.verified,
      role: user.role,
      plan: user.plans.length > 0 && {
        name: user.plans[0].plan.name,
        status: user.plans[0].status,
        ends_at: user.plans[0].ends_at,
      },
    },
  });
};

const confirm = async (req, res) => {
  const token = req.params.token;

  try {
    const verification = await prisma.userVerification.findFirst({
      where: {
        encrypted_string: token,
        expires_at: { gt: now },
      },
    });

    if (!verification)
      return res.status(400).json({
        message: "The email confirmation link has expired!",
      });

    const verifyUser = await prisma.user.update({
      data: {
        verified: true,
      },
      where: {
        id: verification.user_id,
      },
    });

    if (!verifyUser)
      return res.status(400).json({
        message: "Your account could not be verified!",
      });

    const removeVerification = await prisma.userVerification.delete({
      where: { encrypted_string: token },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong!" });
  }

  return res.status(201).json({
    message: "Your account has been successfully verified!",
  });
};

export { register, login, account, confirm };
