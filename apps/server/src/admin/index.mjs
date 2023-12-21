import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import Connect from "connect-pg-simple";
import session from "express-session";
import { PrismaClient } from "@prisma/client";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { dark, light } from "@adminjs/themes";
import { Components, componentLoader } from "./components.mjs";

const DEFAULT_ADMIN = {
  email: "pipas",
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

const admin = new AdminJS({
  defaultTheme: light.id,
  availableThemes: [dark, light],
  resources: [
    {
      resource: { model: getModelByName("User"), client: prisma },
      options: {
        properties: {
          id: {
            isVisible: {
              edit: false,
              show: false,
              list: false,
              filter: true,
            },
          },
          password: {
            isVisible: {
              edit: false,
              show: false,
              list: false,
              filter: false,
            },
          },
        },
      },
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
        actions: {
          sendUserCredentials: {
            actionType: "record",
            component: Components.Credentials,
            handler: async (request, response, context) => {
              const { record, currentAdmin } = context;
              return {
                record: record.toJSON(currentAdmin),
                msg: "Hello World",
              };
            },
            showInDrawer: true,
          },
        },
      },
    },
  ],
  componentLoader,
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

export { admin, adminRouter };
