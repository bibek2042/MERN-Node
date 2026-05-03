require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const app = express()


connectToDatabase()



app.get("/",(req,res)=>{
    res.json({
        message:"This is home page"
    })
})
app.get("/about",(req,res)=>{
    res.json({
        message:"This is about page"
    })
})





app.listen(process.env.PORT,()=>{
    console.log("Nodejs project has started at port 3000")
})



//mongodb+srv://Bibekchaudhary:<db_password>@cluster0.edebov8.mongodb.net/?appName=Cluster0
//mongodb+srv://Bibekchaudhary:<db_password>@cluster0.edebov8.mongodb.net/?appName=Cluster0