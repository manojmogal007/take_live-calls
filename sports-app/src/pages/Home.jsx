import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { url } from '../components/url'
import Event from '../components/Event'
import '../styles/Home.css'

const Home = () => {

  const token=localStorage.getItem('token')
  const  [events,setevents]=useState([])
  // console.log(token)

  const allevents=()=>{
    axios({
      method:'post',
      url:`${url}/event/userevents`,
      headers:{
        Authorization:token
      }
    })
    .then((res)=>{
      // console.log(res)
      setevents(res.data.events)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    allevents()
  },[])
  return (
    <div className='home'>
        <div>
            <Navbar allevents={allevents}/>
        </div>
        <div className='allevents'>
          {
            events?.map((el)=>(
              <Event key={el._id} {...el}/>
            ))
          }
        </div>
    </div>
  )
}

export default Home