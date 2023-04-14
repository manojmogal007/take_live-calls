const express=require('express')
const {createevent,getevents,updateevent,getsingleevent,deleteevent}=require('../controllers/event.controller')

const eventRouter=express.Router()

eventRouter.route('/allevents').get(getevents)
eventRouter.route('/singleevent/:id').get(getsingleevent)
eventRouter.route('/createevent').post(createevent)
eventRouter.route('/update/:id').patch(updateevent)
eventRouter.route('/delete/:id').delete(deleteevent)

module.exports=eventRouter
