const express=require('express')
const Eventmodel=require('../models/event.model')

exports.createevent=async(req,res)=>{
    try{
        const new_event=new Eventmodel(req.body)
        await new_event.save()
        res.status(200).json({'msg':'Event created'})
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Cannot create event'})
    }
}

exports.getevents=async(req,res)=>{
    try{
        const allevents=await Eventmodel.find()
        res.status(200).json({'msg':'Events found',allevents})
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Cannot get event'})
    }
}

exports.getsingleevent=async(req,res)=>{
    const {id}=req.params
    try{
        const event=await Eventmodel.find({_id:id})
        res.status(200).json({'msg':'Events found','event':event[0]})
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Cannot get event'})
    }
}

exports.updateevent=async(req,res)=>{
    const {id}=req.params
    const {creator_id}=req.body
    const event=await Eventmodel.findOne({_id:id})
    // console.log(req.body)
    // console.log(event)
    try{
        if(creator_id===event.creator_id){
            await Eventmodel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).json({'msg':'Event updated'})
        }else{
            res.status(200).json({'msg':'You are not authorized'})
        }
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Cannot update event'}) 
    }
}

exports.deleteevent=async(req,res)=>{
    const {id}=req.params
    const user_id=req.body.user_id
    const event=await Eventmodel.find({_id:id})
    try{
        if(user_id===event.user_id){
            await Eventmodel.findByIdAndDelete({_id:id})
            res.status(200).json({'msg':'Event deleted'})
        }else{
            res.status(200).json({'msg':'You are not authorized'})
        }
    }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Cannot delete event'}) 
    }
}

exports.getuserevents=async(req,res)=>{
    const {creator_id}=req.body
   try{
        const events=await Eventmodel.find({creator_id:creator_id})
        res.status(200).json({'msg':'Events found',events})
   }catch(err){
        console.log(err)
        res.status(400).json({'msg':'Events fetching error'})
   } 
}