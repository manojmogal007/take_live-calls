const express=require('express')
const {getuserevents,createevent,getevents,updateevent,getsingleevent,deleteevent}=require('../controllers/event.controller')
const authentication=require('../middlewares/authentication')

const eventRouter=express.Router()

eventRouter.route('/allevents').get(getevents)
eventRouter.route('/singleevent/:id').get(getsingleevent)

eventRouter.use(authentication)
eventRouter.route('/createevent').post(createevent)
eventRouter.route('/update/:id').patch(updateevent)
eventRouter.route('/delete/:id').delete(deleteevent)
eventRouter.route('/userevents').post(getuserevents)
module.exports=eventRouter
