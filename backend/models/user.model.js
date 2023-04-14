const { default: mongoose } = require('mongoose')
const monoose=require('mongoose')


const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})


const Usermodel=mongoose.model('user',userSchema)

module.exports=Usermodel