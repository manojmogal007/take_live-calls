const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Usermodel=require('../models/user.model')


exports.signup=async(req,res)=>{
    const {email,username,password}=req.body
    // console.log(req.body)
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
           if(err){
                console.log(err)
                res.status(200).json({'msg':'Signup unsuccessful'})
           }else{
                const new_user=new Usermodel({password:hash,username,email})
                await new_user.save()
                res.status(200).json({'msg':'Signup successful'})
           }
        });
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Error'})
    }
}

exports.login=async(req,res)=>{
    const {email,password}=req.body
    const user=await Usermodel.find({email})
    try{
        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {
                if(result){
                    var token = jwt.sign({ user_id: user[0]._id }, 'task-manager');
                    res.status(200).json({token,'msg':'Login successful','user':user[0]})
                }else{
                    res.status(200).json({'msg':'Wrong details'})
                }
            });
        }else{
            res.status(200).json({'msg':'Not found'})
        }
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Error'})
    }
}
