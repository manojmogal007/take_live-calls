const mongoose=require('mongoose')

const eventSchema=mongoose.Schema({
    title:String,
    game:String,
    description:String,
    starttime:String,
    endtime:String,
    date:String,
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
})

const Eventmodel=mongoose.model('event',eventSchema)

module.exports=Eventmodel