const express = require('express')
const mysql= require('mysql2')
const app = express();
const cors = require('cors')


const port = 8800;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"fsp"
})
app.use(express.json())
app.use(cors())
app.get('/books',(req,res)=>{
    const q="Select * from bookStore"
    connection.query(q,(error,result)=>{
        if(error)  return res.json("Error retriving books!!")
        
        return res.json(result)
    })
})

app.delete('/books/:id',(req,res)=>{
   const bookId=req.params.id
    const q="Delete from bookStore where id= ?"
    connection.query(q,[bookId],(error,result)=>{
        if(error) return res.json("Error deleting books!!")
        return res.json("Book Deleted Successfully!!")
    })
})
app.patch('/books/:id',(req,res)=>{
    const bookId=req.params.id
     const q="Update bookStore set `title`=? ,`descr`=? ,`cover`=?, `price`=? where id = ?"
     const values=[
        req.body.title,
        req.body.descr,
        req.body.cover,
        req.body.price
    ]

     
     connection.query(q,[...values,bookId],(error,result)=>{
         if(error) return res.json("Error updating books!!")
         return res.json("Book Updated Successfully!!")
     })
 })
 

app.post('/books',(req,res)=>{
    const q="INSERT into bookStore(`id`,`title`,`descr`,`cover`,`price`) values(?)"
    const values=[
        req.body.id,
        req.body.title,
        req.body.descr,
        req.body.cover,
        req.body.price
    ]

    connection.query(q,[values],(error,result)=>{
        if(error) return res.json("Error inserting books!!")
        return res.json("Book Created Successfully!!")
    })
})

