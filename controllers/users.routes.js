const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
require('dotenv').config();

const {UserModel}= require('../models/user.model.js')

const UserRouter = express.Router();

UserRouter.get('/',(req,res)=>{
    try {
        res.send(`<h1>UserRouter is running fine</h1><h2>Port No. : ${process.env.PORT}</h2>`)
    } catch (error) {
        console.log(error)
        res.status(500).send({msg : error.message})
    }
})


UserRouter.post('/signup',async (req,res)=>{
    let {email,name,password} = req.body
    try {
        let ifexists = await UserModel.find({email});
        
        if(ifexists.length){
            res.status(400).send({msg:"This account already exists"});
        }else{
            bcrypt.hash(password, 8, async(err, hash)=>{
                // Store hash in your password DB.
                if(err){
                    console.log(err)
                    res.status(500).send({msg:err})
                }else{
                    let user =  UserModel({email,name,password:hash})
                    await user.save();

                    res.status(201).send({msg:"User Registered",user})
                }
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({msg : error.message})
    }
})

UserRouter.post('/login',async (req,res)=>{
    let {email,password} = req.body
    try {
        let ifexists = await UserModel.find({email});
        console.log(ifexists)
        if(ifexists.length){
            bcrypt.compare(password, ifexists[0].password, (err, result)=>{
                // result == true
                if(err){
                    console.log(err)
                    res.status(500).send({msg:err})
                }else{
                    if(result){
                        let token = jwt.sign({userID : ifexists[0]._id , email}, process.env.secret , { expiresIn: '1h' });
                        res.status(200).send({msg:"Login SuccessFull",token})
                    }else{
                        res.status(400).send({msg:"Wrong Credentials"});
                    }
                }
            });
        }else{
            res.status(400).send({msg:"Wrong Credentials"});
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({msg : error.message})
    }
})

module.exports = {UserRouter}