import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function createUser(req, res) {
  const newUserData = req.body;

  if (newUserData.type == "admin") {
    if (req.user == null) {
      res.json({
        message: "Please login as administrator to create admin account",
      });
      return;
    }
    if (req.user.type != "admin") {
      res.json({
        message: "Please login as administrator to create admin account",
      });
      return;
    }
  }
  newUserData.password = bcrypt.hashSync(newUserData.password, 10);

  const user = new User(newUserData);
  user
    .save()
    .then(() => {
      res.json({
        message: "User saved successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Error in saving user",
      });
    });
}

export function loginUser(req, res) {
  User.find({ email: req.body.email }).then((users) => {
    if (users.length == 0) {
      res.json({
        message: "User not found",
      });
    } else {
      const user = users[0];
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type,
            isBlocked: user.isBlocked,
            profilePicture: user.profilePicture,
          },
          process.env.JWT_SECRET
        );

        res.json({
          message: "Login successful",
          token: token,
        });

        console.log(token);
      } else {
        res.json({
          message: "Incorrect password",
        });
      }
    }
  });
}

export function isAdmin(req){
  if(req.user == null){
    return false;
  }
 if(req.user.type !== "admin"){
  return true;
 }
 return true;
 
}

export function isCustomer(req){
  if(req.user == null){
    return false;
  }
 if(req.user.type !== "customer"){
  return true;
 }
 return true;
}
//gs.doe@example.com - customer account
//gavrawa.doe@example.com - admin account
