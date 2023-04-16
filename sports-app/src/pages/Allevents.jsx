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
  const [title,settitle]=useState('')
  const [game,setgame]=useState(null)
  // console.log(events)

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

  const handlefilter=(e)=>{
    if(e.target.value==='all'){
      setgame(null)
      return;
    }
    const games=events.filter((el)=>el.game===e.target.value)
    // console.log(games)
    setgame(games)
  }

  const handlechangetitle=(e)=>{
    settitle(e.target.value)
  }

  const handlesearch=(e)=>{
    const games=events.filter((el)=>title===el.title)
    // console.log(games)
    setgame(games)
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
            <Input placeholder='Search event' value={title} onChange={handlechangetitle}/>
            <Button pl='25px' pr='25px' colorScheme='blue' onClick={handlesearch}>Search</Button>
            <Select placeholder='Filter by game'  onChange={handlefilter}>
                  <option value='all' >All</option>
                  <option value='cricket'>Cricket</option>
                  <option value='football'>Football</option>
                  <option value='tenis'>Tenis</option>
                  <option value='badminton'>Badminton</option>
                  <option value='chess'>Chess</option>
                  <option value='hockey'>Hockey</option>
            </Select>
        </div>
        <h1>All events</h1>
        <div className='allevents'>
          {
            game===null&&events?.map((el)=>(
              <Allevent key={el._id} {...el}/>
            ))
          }
          {
            game!==null&&game?.map((el)=>(
              <Allevent key={el._id} {...el}/>
            ))
          }
        </div>
    </div>
  )
}

export default Allevents