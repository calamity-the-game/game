const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

process.on("uncaughtException", (error) => {
    logger.log({ level: "error", message: error });
    logger.log({ level: "error", message: error.stack });
});

module.exports = app;
