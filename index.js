const express = require('express');

const cors = require('cors');
require('dotenv').config();

const {UserRouter} = require('./controllers/users.routes.js')
const  {ClassifiedsRouter} = require('./controllers/Classfields.routes.js')
const {connection} = require('./connection.js')

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    try {
        res.send(`<h1>Server is running fine</h1><h2>Port No. : ${process.env.PORT}</h2>`)
    } catch (error) {
        console.log(error)
        res.send({msg : error.message})
    }
})

app.use('/user',UserRouter)
app.use('/classfields',ClassifiedsRouter)

app.listen(process.env.PORT,async ()=>{
    try {
        await connection
        console.log(`Server running on ${process.env.PORT} and connected to DB`)
    } catch (error) {
        console.log(error)
    }
})