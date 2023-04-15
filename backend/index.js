const express=require('express')
const cors=require('cors')
require('dotenv').config()
const mongoose=require('mongoose')
const useRouter=require('./routes/user.route')
const eventRouter=require('./routes/event.route')
const requestRouter=require('./routes/request.route')

const app=express()
app.use(cors())
app.use(express.json())
app.use('/user',useRouter)
app.use('/event',eventRouter)
app.use('/request',requestRouter)




app.listen(process.env.port,()=>{
    mongoose.connect(process.env.url)
    .then(()=>{
        console.log('Connected to database')
    })
    .catch((e)=>{
        console.log('Database connection error')
    })
    .finally(()=>{
        console.log(`Server running on ${process.env.port}`)
    })
})