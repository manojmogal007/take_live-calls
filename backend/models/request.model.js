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
    },
    event:{
        title:String,
        game:String,
        description:String,
        starttime:String,
        endtime:String,
        date:Date,
        players:Number,
        creator_id:String,
        count:Number,
        isfull:Boolean,
        playerdetails:[
            {
                username:String,
                email:String,
                password:String 
            }
        ]
    }
})

const Requestmodel=mongoose.model('request',requestSchema)

module.exports=Requestmodel