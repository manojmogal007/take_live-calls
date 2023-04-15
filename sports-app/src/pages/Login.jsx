import { Button, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import '../styles/Signup.css'
import axios from 'axios'
import { url } from '../components/url'
import { Link, useNavigate } from 'react-router-dom'

const state={
    email:'',
    password:''
}
const Login = () => {
    const [user,setuser]=useState(state)
    const toast=useToast()
    const navigate=useNavigate()
    // console.log(user)
    const handlechange=(e)=>{
        const {value,name}=e.target
        setuser({...user,[name]:value})
    }

    const handlesubmit=(e)=>{
        e.preventDefault()
        const {email,password}=user
        if(email===''||password===''){
            toast({
                title: 'Fill all details',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:'top-right'
              })
              return
        }
        axios.post(`${url}/user/login`,user)
        .then((res)=>{
            console.log(res)
            if(res.data.msg==='Login successful'){
                toast({
                    title: 'Login successful',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position:'top-right'
                  })
                  localStorage.setItem('token',res.data.token)
                  localStorage.setItem('user',JSON.stringify(res.data.user))
                  navigate('/')
            }else{
                toast({
                    title: 'Wrong credential',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position:'top-right'
                  })
            }
        })
        .catch((err)=>{
            toast({
                title: 'Please try again',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:'top-right'
              })
        })
    }

    const {email,password}=user

  return (
    <div className='signup'>
        <div>
            <h1>Login</h1>
            <Input placeholder='Email' type='email' name='email' value={email} onChange={handlechange}/>
            <Input placeholder='Password' type='password' name='password' value={password} onChange={handlechange}/>
            <Button onClick={handlesubmit}>Login</Button>
            <p>Don't have account <Link to='/signup' style={{color:'blue' ,textDecoration:'underline'}}><span >Sign up</span></Link></p>
        </div>
    </div>
  )
}

export default Login