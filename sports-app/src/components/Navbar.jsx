import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Eventmodal from './Eventmodal'
import '../styles/Navbar.css'

const Navbar = ({allevents}) => {

    const {username}=JSON.parse(localStorage.getItem('user'))
    const navigate=useNavigate()

    const handlelogout=()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <div className='navbar'>
        <div>
            <Eventmodal allevents={allevents}/>
        </div>
        <div>
            <Link to='/'><h3>Allevents</h3></Link>
            <Link to='/events'><h3>Your events</h3></Link>
        </div>
        <div>
            <p>Hi! {username}</p>
            <Button onClick={handlelogout}>Logout</Button>
        </div>
    </div>
  )
}

export default Navbar