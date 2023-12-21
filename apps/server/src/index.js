import express, { urlencoded, json } from "express";
import morgan from "morgan";
import cors from "cors";
import _ from "dotenv";

const app = express();
const port = process.env.APP_PORT;

import auth from "./routes/auth.mjs";
import channel from "./routes/channel.mjs";
import category from "./routes/category.mjs";
import plan from "./routes/plan.mjs";
import user from "./routes/user.mjs";

app.use(
  cors({
    origin: "*",
    // origin: process.env.FRONTEND_URL,
  })
);
app.use(morgan("tiny"));
app.use(urlencoded({ extended: "false" }));
app.use(json());

app.use("/api/auth", auth);
app.use("/api", channel, category, plan);
app.use("/api/user", user);

app.listen(port, console.log(`Listening on port ${port}....`));
