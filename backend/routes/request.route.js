const express=require('express')
const {getrequestbyplayer,getrequest,getrequestbyuser,createrequest,updaterequest,deleterequest}=require('../controllers/request.controller')
const authentication=require('../middlewares/authentication')

const requestRouter=express.Router()

requestRouter.route('/getall').get(getrequestbyuser)
requestRouter.route('/createreq').post(createrequest)
requestRouter.route('/getbyplayer').post(getrequestbyplayer)

requestRouter.use(authentication)

requestRouter.route('/getreqbycreator').post(getrequest)
requestRouter.route('/updatereq/:id').patch(updaterequest)
requestRouter.route('/deletereq/:id').delete(deleterequest)


module.exports=requestRouter