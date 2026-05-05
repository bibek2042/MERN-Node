require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')

const app = express()
app.use(express.json())
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage : storage})

connectToDatabase()



app.get("/",(req,res)=>{
    res.json({
        message:"This is home page"
    })
})

    
    // console.log(req.body)
    app.post("/blog",upload.single('image'),(req,res)=>{
        console.log(req.body)
    res.status(200).json({
        messaage : "Blog api hit successfully"
    })
})





app.listen(process.env.PORT,()=>{
    console.log("Nodejs project has started at port 3000")
})



