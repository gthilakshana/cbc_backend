import express from "express";
import { createUser, loginUser ,getUsers,deleteUser} from "../controllers/userController.js";
import { get } from "mongoose";

const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.delete("/:email", deleteUser);
userRouter.post("/", createUser);
userRouter.get("/",getUsers);

export default userRouter;
