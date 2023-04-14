const express=require('express')
const {signup,login}=require('../controllers/user.controller')

const useRouter=express.Router()


useRouter.route('/register').post(signup)
useRouter.route('/login').post(login)

module.exports=useRouter