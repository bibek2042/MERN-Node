require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const app = express()
app.use(express.json())


connectToDatabase()



app.get("/",(req,res)=>{
    res.json({
        message:"This is home page"
    })
})
// app.get("/about",(req,res)=>{
//     res.json({
//         message:"This is about page"
//     })
// })


app.post("/blog",(req,res)=>{
    console.log(req.body)
    res.status(200).json({
        messaage : "Blog api hit successfully"
    })
})




app.listen(process.env.PORT,()=>{
    console.log("Nodejs project has started at port 3000")
})



//mongodb+srv://Bibekchaudhary:<db_password>@cluster0.edebov8.mongodb.net/?appName=Cluster0
//mongodb+srv://Bibekchaudhary:<db_password>@cluster0.edebov8.mongodb.net/?appName=Cluster0