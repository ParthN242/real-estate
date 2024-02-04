const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/user.route.js");
const authRouter = require("./Routes/auth.route.js");
const listingRouter = require("./Routes/listing.route.js");

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("datasbase connected");
});

app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.listen(2000, () => {
  console.log("server started on 2000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use("*", (req, res) => {
  res.status(200).json("bad request");
});
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.code == 11000) {
    statusCode = 400;
    message = `${err.keyValue.email && "Email"} is already use`;
  }
  if (err?.name?.JsonWebTokenError) {
    statusCode = 401;
    message = `Invaild JWT`;
  }
  // console.log("err ===", err);
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
