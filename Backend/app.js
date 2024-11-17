const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const { db } = require("./db/db");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const PORT = process.env.PORT;
const sendBillNotifications = require("./cron")

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/users", authRoutes);
app.use("/api/v1/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

sendBillNotifications;

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("You are Listening to port:", PORT);
  });
};

server();