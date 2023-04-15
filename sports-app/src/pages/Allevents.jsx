import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { url } from '../components/url'
import '../styles/Home.css'
import Allevent from '../components/Allevent'
import { Button, Input, Select } from '@chakra-ui/react'

const Allevents = () => {

  const token=localStorage.getItem('token')
  const  [events,setevents]=useState([])
  // console.log(token)

  const allevents=()=>{
    axios({
      method:'get',
      url:`${url}/event/allevents`
    })
    .then((res)=>{
    //   console.log(res)
      setevents(res.data.allevents)
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
        <div className='filters'>
            <Input/>
            <Button pl='25px' pr='25px' colorScheme='blue'>Search</Button>
            <Select >
                  <option value='cricket'>Cricket</option>
                  <option value='football'>Football</option>
                  <option value='tenis'>Tenis</option>
                  <option value='badminton'>Badminton</option>
                  <option value='chess'>Chess</option>
                  <option value='hockey'>Hockey</option>
            </Select>
        </div>
        <div className='allevents'>
          {
            events?.map((el)=>(
              <Allevent key={el._id} {...el}/>
            ))
          }
        </div>
    </div>
  )
}

export default Allevents