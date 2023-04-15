import { Button, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import '../styles/Signup.css'
import axios from 'axios'
import { url } from '../components/url'
import { Link, useNavigate } from 'react-router-dom'

const state={
    username:'',
    email:'',
    password:''
}
const Signup = () => {
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
        const {username,email,password}=user
        if(username===''||email===''||password===''){
            toast({
                title: 'Fill all details',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:'top-right'
              })
              return
        }
        axios.post(`${url}/user/register`,user)
        .then((res)=>{
            // console.log(res)
            if(res.data.msg==='Signup successful'){
                toast({
                    title: 'Signup successful',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position:'top-right'
                  })
                  navigate('/login')
            }else{
                toast({
                    title: 'Signup unsuccessful',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position:'top-right'
                  })
            }
        })
        .catch((err)=>{
            toast({
                title: 'Signup unsuccessful',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:'top-right'
              })
        })
    }

    const {username,email,password}=user

  return (
    <div className='signup'>
        <div>
            <h1>Sign Up</h1>
            <Input placeholder='Username' type='text' name='username' value={username} onChange={handlechange}/>
            <Input placeholder='Email' type='email' name='email' value={email} onChange={handlechange}/>
            <Input placeholder='Password' type='password' name='password' value={password} onChange={handlechange}/>
            <Button onClick={handlesubmit}>Sign up</Button>
            <p>Already have account <Link to='/login' ><span style={{color:'blue' ,textDecoration:'underline'}}>Login</span></Link></p>
        </div>
    </div>
  )
}

export default Signup