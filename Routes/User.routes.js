require('dotenv').config();
const { Router } = require('express');
const UserRouter = Router();
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const { UserModel } = require('../Models/User.model')

UserRouter.post('/signup', async (req,res) =>{
    const {email,password} = req.body;
    const UserExist = await UserModel.findOne({email});
    if(UserExist?.email) res.send({"message" : "Account Already Exist, Try Log In"})
    else
    {
        try {
            bcrypt.hash(password,3, async(err,hash)=>{
                const SignUp = new UserModel({email,password : hash});
                await SignUp.save( );
                res.send({"message" : "Sign Up Successfull"});
            })
        } catch (error) {
            res.status(400).send({"message" : "Oops!! Something Went Wrong Failed To SignUp"})
        }
    }
})


module.exports = {
    UserRouter
};