require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')

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


app.post("/blog",async (req,res)=>{
    // const description = req.body.description
    // const title = req.body.title
    // const subtitle = req.body.subtitle
    // const image = req.body.image
    // console.log(req.body)
    const {title,description,image,subtitle} = req.body
    if(!title || !description || !image || !subtitle){
        return res.status(400).json({
            message : "Please provide title, description,subtitle,image"
        })
    }
    // console.log(title,description,image,subtitle)
    await Blog.create({
        title : title,
        description : description,
        subtitle : subtitle,
        image : image
    })
    
    // console.log(req.body)
    res.status(200).json({
        messaage : "Blog api hit successfully"
    })
})




app.listen(process.env.PORT,()=>{
    console.log("Nodejs project has started at port 3000")
})



//mongodb+srv://Bibekchaudhary:<db_password>@cluster0.edebov8.mongodb.net/?appName=Cluster0
//mongodb+srv://Bibekchaudhary:<db_password>@cluster0.edebov8.mongodb.net/?appName=Cluster0