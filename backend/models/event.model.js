const mongoose=require('mongoose')

const eventSchema=mongoose.Schema({
    description:String,
    starttime:Date,
    endtime:Date,
    date:Date,
    players:Number,
})

const Eventmodel=mongoose.model('event',eventSchema)

module.exports=Eventmodel