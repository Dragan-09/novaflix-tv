import express, { urlencoded, json } from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = process.env.APP_PORT;

// routes
import auth from "./routes/auth.mjs";
import channel from "./routes/channel.mjs";
import category from "./routes/category.mjs";
import plan from "./routes/plan.mjs";
import user from "./routes/user.mjs";
import feature from "./routes/feature.mjs";

// services
import sendCredentials from "./services/email/credentials.mjs";

app.use(
  cors({
    origin: "*",
    // origin: process.env.FRONTEND_URL,
  }),
);
app.use(morgan("tiny"));
app.use(urlencoded({ extended: "false" }));
app.use(json());

app.use("/api/auth", auth);
app.use("/api", channel, category, plan, feature);
app.use("/api/user", user);

sendCredentials();

// app start
app.listen(port, console.log(`Listening on port ${port}....`));
