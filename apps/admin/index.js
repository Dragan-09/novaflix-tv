import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import Connect from "connect-pg-simple";
import session from "express-session";
import { PrismaClient } from "@prisma/client";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { dark, light } from "@adminjs/themes";

const PORT = process.env.PORT || 3000;

const DEFAULT_ADMIN = {
  email: "admin@example.com",
  password: "password",
};

const prisma = new PrismaClient();

AdminJS.registerAdapter({ Database, Resource });

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const start = async () => {
  const app = express();

  const admin = new AdminJS({
    defaultTheme: dark.id,
    availableThemes: [dark, light],
    resources: [
      {
        resource: { model: getModelByName("User"), client: prisma },
        // options: { id: "Users" },
      },
      {
        resource: { model: getModelByName("Plan"), client: prisma },
        // options: { id: "Plans" },
      },
      {
        resource: { model: getModelByName("Channel"), client: prisma },
        // options: { id: "Channels" },
      },
      {
        resource: { model: getModelByName("Category"), client: prisma },
        // options: { id: "Categories" },
      },
      {
        resource: { model: getModelByName("PlansOnUsers"), client: prisma },
        options: {
          id: "Subscriptions",
        },

        //FIXME: display subscription table
        properties: {
          // id: { type: "string" },
        },
      },
    ],
  });
  admin.watch();

  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production",
    },
    tableName: "session",
    createTableIfMissing: true,
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: "sessionsecret",
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: "sessionsecret",
      cookie: {
        httpOnly: process.env.NODE_ENV == "production",
        secure: process.env.NODE_ENV == "production",
      },
      name: "adminjs",
    }
  );
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
