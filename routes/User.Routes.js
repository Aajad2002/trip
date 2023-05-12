

const express=require('express');
const UserModel = require('../models/User.Model');
const userRouter=express.Router();
const bcrypt=require('bcrypt')
userRouter.get("/register",(req,res)=>{
    res.send("register")
})
userRouter.post("/register", async (req, res) => {
    console.log(req.body)
    try {
        let { email, password } = req.body
        let user = await UserModel.findOne({ email })

        if (user) {
            res.status(200).send("User already exists on this email" )
        } else {
            bcrypt.hash(password, 6, async function (err, hash) {
                const user = new UserModel({ ...req.body, password: hash })
                await user.save()
                res.status(200).send( "Registration Successfull,Login Now!!" )
            });
        }
    } catch (error) {
        console.log("unable to register the new user")
        res.status(400).send({ "err": error.message })
    }
})
userRouter.get("/register",(req,res)=>{
    res.send("register")
})
userRouter.post("/login", async (req, res) => {
    console.log(req.body)
    try {
        let { email, password } = req.body
        let user = await UserModel.findOne({ email })

        if (!user) {
            res.status(200).send("User doesn't exits on this email" )
        } else {
            bcrypt.compare(password, user.password,async function(err, result) {
                if(result){
                    res.status(200).send("Login successfull")
                }else{
                    res.status(201).send("Wrong credentials")
                }
            });
        }
    } catch (error) {
        console.log("unable to register the new user")
        res.status(400).send({ "err": error.message })
    }
})
module.exports=userRouter