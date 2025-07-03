import express from "express";
import { createUser, loginUser ,getUsers,deleteUser ,updateUser} from "../controllers/userController.js";
import { get } from "mongoose";

const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.delete("/:email", deleteUser);
userRouter.put("/:id", updateUser);
userRouter.post("/", createUser);
userRouter.get("/",getUsers);

export default userRouter;
