import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const mongoUrl = process.env.MONGO_DB_URI;

mongoose.connect(mongoUrl, {});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(bodyParser.json());

//--- Jwt Token ---//
app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log(token);

  if (token !== null) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (!error) {
        req.user = decoded;
      }
    });
  }

  next();
});
//--- Jwt Token ---//

app.use("/api/product", productRouter);
app.use("/api/users", userRouter);

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
