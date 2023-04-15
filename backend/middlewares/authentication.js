const jwt=require('jsonwebtoken')


const authentication=(req,res,next)=>{
    const token=req.headers.authorization
    // console.log(token)
    if(token){
        var decoded= jwt.verify(token, 'task-manager');
        if(decoded){
            req.body.creator_id=decoded.user_id
            // console.log(req.body)
            next()
        }else{
            res.status(400).json({'msg':'Login first'})
        }
    }else{
        res.status(400).json({'msg':'Login first'})
    }
}

module.exports=authentication