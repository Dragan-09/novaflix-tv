const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.APP_PORT;

const auth = require("./routes/auth");
const channel = require("./routes/channel");
const category = require("./routes/category");
const plan = require("./routes/plan");
const user = require("./routes/user");

app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api", channel, category, plan);
app.use("/api/user", user);

app.listen(port, console.log(`Listening on port ${port}....`));
