const express = require('express')
const mongoose = require("mongoose")
// const route= require("./routes/route")
const multer = require('multer')


require("dotenv").config()

const app = express()

//Global MIDDLEWARES

app.use(express.urlencoded({ extended: true }))
app.use(multer().any())
app.use(express.json())

// Database Coonection
mongoose.connect(process.env.D_B,{
    useNewUrlParser: true
})
.then(()=>console.log("Connected to Database"))
.catch((e)=>console.log(e))

// app.use("/", route)

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))  