import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

// const require = createRequire(import.meta.url);
// const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const authentication = async (req, res, next) => {
  const authorizationToken = req.headers.authorization;
  const currentUnixTime = Math.floor(Date.now() / 1000);
  if (!authorizationToken || !authorizationToken.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  try {
    const decoded = jwt.verify(
      authorizationToken.split(" ")[1],
      process.env.JWT_SECRET,
    );

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.user,
        username: decoded.username,
      },
    });

    if (!user) throw new Error("Unauthorized");

    if (decoded.exp < currentUnixTime) throw new Error("Unauthorized");

    const { id, username } = decoded;
    req.user = { id, username, verified: user.verified };
    next();
  } catch (e) {
    return res.status(403).json({ message: "Unauthorized!" });
  }
};

export default authentication;
