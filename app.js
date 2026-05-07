require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')

const app = express()
app.use(express.json())
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage : storage})
const fs = require('fs') // fs is a file system

connectToDatabase()



app.get("/",(req,res)=>{
    res.json({
        message:"This is home page"
    })
})

    
    
    app.post("/blog",upload.single('image'),async(req,res)=>{
        const {title,subtitle,description} = req.body
        const filename = req.file.filename
        if(!title || !subtitle || !description){
            return res.status(400).json({
                message : "Please provide title, subtitle, description"
            })
        }
        await Blog.create({
            title : title,
            subtitle : subtitle,
            description : description,
            image : filename 
        })
       
    res.status(200).json({
        messaage : "Blog api hit successfully"
    })
})

app.get("/blog",async (req,res)=>{
    const blogs = await Blog.find() // returns array
    res.status(200).json({
        message : "Blogs fetched successfully",
        data : blogs
    })
})

app.get("/blog/:id",async (req,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id) // object

    if(!blog){
        return res.status(404).json({
            message : "no data found"
        })
    }

    res.status(200).json({  
        message : "Fetched Sucessfully",
        data : blog
    })
})
app.delete("/blog/:id",async (req,res)=>{
    const id = req.params.id 
    await Blog.findByIdAndDelete(id)
    fs.unlink('storage/Bibek-My first logo.png',(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("File deleted successfully")
        }
    })
    res.status(200).json({
        message : 'Blog deleted successfully'
    })
}) 



app.use(express.static('./storage'))





app.listen(process.env.PORT,()=>{
    console.log("Nodejs project has started at port 3000")
})



