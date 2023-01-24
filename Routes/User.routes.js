require('dotenv').config();
const { Router } = require('express');
const UserRouter = Router();
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const { UserModel } = require('../Models/User.model')

UserRouter.post('/signup', async (req,res) =>{
    const {name,email,password} = req.body;
    const UserExist = await UserModel.findOne({email});
    if(UserExist?.email) res.send({"message" : "Account Already Exist, Try Log In"})
    else
    {
        try {
            bcrypt.hash(password,3, async(err,hash)=>{
                const SignUp = new UserModel({name,email,password : hash});
                await SignUp.save( );
                res.send({"message" : "Sign Up Successfull"});
            })
        } catch (error) {
            res.status(400).send({"message" : "Oops!! Something Went Wrong Failed To SignUp"})
        }
    }
})


UserRouter.post("/login", async (req,res) =>{
    const {email,password} = req.body;
    const UserLogin = await UserModel.find({email});
    try {
        if(UserLogin.length > 0) 
        {
            const SecuredPassword = UserLogin[0].password;
            bcrypt.compare(password,SecuredPassword, function (err,result) {
                if(result)
                {
                    const token = JWT.sign({"userID" : UserLogin[0]._id}, process.env.JWT_TOKEN);
                    res.send({"message" : "Account Created Successfully", "token" : token});
                }
                else{
                    res.status(400).send({"message" : "User With Email Not Found, Try Again"})
                }
            })
        }
        else{
            res.status(400).send({"message" : "User With Email Not Found, Try Again"})
        }
    } catch (error) {
        res.status(400).send({"message" : "Oops!! Something Really Went Wrong, Try Again Later"})
    }
})


module.exports = {
    UserRouter
};