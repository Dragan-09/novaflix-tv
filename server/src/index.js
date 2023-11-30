const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.APP_PORT;

const user = require("./routes/auth");

app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());

app.use("/api/auth", user);

app.listen(port, console.log(`Listening on port ${port}....`));
