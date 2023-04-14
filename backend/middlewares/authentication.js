const jwt=require('jsonwebtoken')


const authentication=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        var decoded= jwt.verify(token, 'task-manager');
        if(decoded){
            req.body.creator_id=decoded.user_id
            next()
        }else{
            res.status(400).json({'msg':'Login first'})
        }
    }else{
        res.status(400).json({'msg':'Login first'})
    }
}