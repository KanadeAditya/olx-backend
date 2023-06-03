const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
require('dotenv').config();

const {UserModel}= require('../models/user.model.js')
const {ClassfieldsModel}= require('../models/classfields.model.js')


const ClassifiedsRouter = express.Router();

ClassifiedsRouter.get('/',async (req,res)=>{
    try {
        // res.send(`<h1>ClassifiedsRouter is running fine</h1><h2>Port No. : ${process.env.PORT}</h2>`)
        let allclassfields= await ClassfieldsModel.find()
        res.send(allclassfields)
    } catch (error) {
        console.log(error)
        res.status(500).send({msg : error.message})
    }
})

ClassifiedsRouter.get('/filtered',async (req,res)=>{
    try {
        let {category,sort,page,name} = req.query
        if(!page){
            page = 1 
        }
        let classfields = [];
        if(category && sort){
            classfields = await (await ClassfieldsModel.find({category,name : {$regex : !name ? "" : name , $options : "i"}}).sort({postedAt : sort }))
          
        }else if(category){
            classfields = await (await ClassfieldsModel.find({category,name : {$regex : !name ? "" : name , $options : "i"}}))
        }else{
            console.log(sort)
            classfields = await (await ClassfieldsModel.find({name : {$regex : !name ? "" : name , $options : "i"}}).sort({postedAt :sort}))
            console.log(classfields)
        }
        let ans = classfields.filter((ele,ind)=>{
            return ind >=4*(page-1) && ind< 4*(page)
        })

        res.send(ans)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg : error.message})
    }
})

ClassifiedsRouter.post('/',async (req,res)=>{
    try {
        let {name, description, category, image, location, postedAt, price } = req.body
        if (!name || !description || !category || !image || !location || !postedAt || !price ){
            res.status(400).send({msg:"Please provide all the details"})
        }else{
            let classfield = new ClassfieldsModel({name, description, category, image, location, postedAt, price } )
            await classfield.save();
            res.status(201).send({msg : "Classfield has been created",classfield})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({msg : error.message})
    }
})

// ClassifiedsRouter.get('/search',async (req,res)=>{
//     try {
//         let {name} = req.query
//         let allclassfields= await ClassfieldsModel.find({});
//         res.send(allclassfields)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({msg : error.message})
//     }
// })

ClassifiedsRouter.patch('/:id',async (req,res)=>{
    try {
        let {id} = req.params
        let allclassfields= await ClassfieldsModel.findByIdAndUpdate(id,req.body,{returnDocument:'after'})
        res.status(201).send(allclassfields)
    } catch (error) {
        console.log(error)
        res.status(500).send({msg : error.message})
    }
})
ClassifiedsRouter.delete('/:id',async (req,res)=>{
    try {
        let {id} = req.params
        await ClassfieldsModel.findByIdAndDelete(id)
        res.status(200).send({msg:"Classfield has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg : error.message})
    }
})

module.exports = {ClassifiedsRouter};