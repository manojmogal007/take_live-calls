const mongoose=require('mongoose')


const requestSchema=mongoose.Schema({
    event_id:String,
    creator_id:String,
    player_id:String,
    status:String, //accepted,rejected or pending
    player:{
        _id:String,
        email:String,
        username:String
    }
})

const Requestmodel=mongoose.model('request',requestSchema)

module.exports=Requestmodel