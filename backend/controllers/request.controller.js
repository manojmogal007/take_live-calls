const Requestmodel=require('../models/request.model')
const Eventmodel=require('../models/event.model')


exports.getrequest=async(req,res)=>{
    const {creator_id,event_id}=req.body
    // console.log('here')
    try{
        const requests=await Requestmodel.find({creator_id,event_id})
        res.status(200).json({'msg':'Requests found',requests})
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Cannot found requests'})
    }
}
exports.getrequestbyplayer=async(req,res)=>{
    const {player_id,event_id}=req.body
    // console.log('here')
    try{
        if(player_id&&event_id){
            const requests=await Requestmodel.find({player_id,event_id})
            res.status(200).json({'msg':'Requests found',requests})
        }else{
            // console.log(player_id)
            const requests=await Requestmodel.find({player_id})
            res.status(200).json({'msg':'Requests found',requests})
        }
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Cannot found requests'})
    }
}

exports.getrequestbyuser=async(req,res)=>{
    const {player_id}=req.body
    try{
        const requests=await Requestmodel.find({player_id})
        res.status(200).json({'msg':'Requests found',requests})
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Cannot found request'})
    }
}

exports.createrequest=async(req,res)=>{
    
    try{
        const new_request=new Requestmodel(req.body)
        await new_request.save()
        res.status(200).json({'msg':'Request created'})
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Cannot create request'})
    }
}

exports.updaterequest=async(req,res)=>{
    const {id}=req.params
    const {event_id,creator_id,status}=req.body
    const check=await Requestmodel.find({_id:id})
    // console.log(req.body)
    try{
        // console.log(creator_id,check.)
        if(creator_id===check[0].creator_id){
            await Requestmodel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).json({'msg':'Request updated'})
        }else{
            res.status(200).json({'msg':'Not authorized'})
        }
        
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Cannot update request'}) 
    }
}

exports.deleterequest=async(req,res)=>{
    const {id}=req.params
    const {creator_id}=req.body
    const check=await Requestmodel.find({_id:id})
    try{
        if(creator_id===check.creator_id){
            await Requestmodel.findByIdAndDelete({_id:id})
            res.status(200).json({'msg':'Request deleted'})
        }else{
            res.status(200).json({'msg':'Not authorized'})
        }
        
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Cannot delete request'}) 
    }
}