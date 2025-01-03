const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandling");
require("dotenv").config();
const cookieParser = require("cookie-parser");

connectDB();
const app = express();

app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/products", require("./routes/productRoute"));

app.use("*", () => {
  throw new Error("Invalid route");
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`server is running on port ${PORT}`)
);
process.on("unhandledRejection", (err) => {
  console.log(`unhandled rejection error || ${err.name} : ${err.message}`);
  server.close(() => {
    console.log("shutting down");
    process.exit(1);
  });
});
