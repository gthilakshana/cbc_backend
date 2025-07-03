import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function createUser(req, res) {
  const newUserData = req.body;

  if (newUserData.type == "admin" ){
    if(req.user==null){
        res.json({
           message:"please login as admin to create admin account"
        })
        return
    }else{
        if(req.user.type!="admin"){
            res.json({
               message:"please login as admin to create admin account"
            })
            return
        }else{
            console.log("admin")
        }
    }
  }
  
  newUserData.password = bcrypt.hashSync(newUserData.password, 10);


  console.log(newUserData.password);

  const user = new User(newUserData);
  user.save().then(() => {
    res.json({
      message: "Signup successfully"
    
      
    })
  }).catch((err) => { 
    console.error("Error creating user:", err);  
    res.status(500).json({
     
      error: err.message  
    })
  })
}

export function loginUser(req,res){
    User.find({email:req.body.email}).then((users)=>{
          if(users.length==0){
           res.json({
            message:"User not found"
           })
          }else{
            const user=users[0]
            if (req.body.password && user.password) {
                const isPasswordCorrect=bcrypt.compareSync(req.body.password,user.password)
                console.log(isPasswordCorrect)
                if(isPasswordCorrect){
                const token=    jwt.sign({
                    email:user.email,
                    password:user.password,
                    firstName:user.firstName,
                    lastName:user.lastName,
                     type: user.type,

                
                }, process.env.JWT_SECRET
)
                
                
                 res.json({
                        message:"login Success",
                        token:token,
                        user: {  
                            email:user.email,
                            firstName:user.firstName,
                            lastName:user.lastName,
                            type: user.type,
                        }
                    })
                    
                }else{
                    res.json({
                        message:""
                    })
                }
            } else {
                res.json({
                    message:"password missing"
                })
            }
          } 
    })
}

// export function deleteUser(req,res){
//     User.findOneAndDelete({email:req.body.email}).then((user)=>{
//         if(user){
//             res.json({
//                 message:"user deleted"
//             })
//         }else{
//             res.json({
//                 message:"user not found"
//             })
//         }
//     })
// }


export function deleteUser(req, res) {
    const email = req.params.email;

    User.findOneAndDelete({ email }).then((user) => {
        if (user) {
            res.json({
                message: "user deleted"
            });
        } else {
            res.status(404).json({
                message: "user not found"
            });
        }
    }).catch((err) => {
        console.error("Error deleting user:", err);
        res.status(500).json({
            message: "error deleting user",
            error: err.message
        });
    });
}


export function isAdmin(req){
    if(req.user==null){
        return false
    }
    if(req.user.type!="admin"){
        return false
    }else{
        return true
    }
}

export function isCustomer(req){
  if(req.user==null){
        return false
    }
    if(req.user.type!="customer"){
        return false
    }else{
        return true
    }
}


export function getUsers(req,res){
    User.find().then((user)=>{
        res.json(user)
    })
}
