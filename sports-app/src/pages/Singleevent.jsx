import axios from 'axios'
import { url } from '../components/url'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import Requests from '../components/Requests'
import { color } from 'framer-motion'



const Singleevent = () => {
    const {id}=useParams()
    const [singleevent,setsingleevent]=useState(null)
    const {_id}=JSON.parse(localStorage.getItem('user'))
    const user=JSON.parse(localStorage.getItem('user'))
    const token=localStorage.getItem('token')
    const [requests,setrequests]=useState(null)
    // console.log(singleevent.count,singleevent.players)


    const fetchevent=()=>{
        axios.get(`${url}/event/singleevent/${id}`)
        .then((res)=>{
            // console.log(res)
            setsingleevent(res.data.event)
            fetchrequest()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    // console.log(id)

    const fetchrequest=()=>{
        axios({
            url:`${url}/request/getreqbycreator`,
            method:'post',
            headers:{
                Authorization:token
            },
            data:{
                event_id:id
            }
        })
        .then((res)=>{
            // console.log(res)
            setrequests(res.data.requests)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    

    useEffect(()=>{
        fetchevent()
    },[])

  return (
    <div>
        {
           singleevent!==null&& <div>
                <h2>{singleevent.title}</h2>
                <p>{singleevent.description}</p>
                <p>Date : {singleevent.date}</p>
                <p>Time : {singleevent.starttime} to {singleevent.endtime}</p>
                <Link to='/events'><p style={{color:'blue',textDecoration:'underline'}}>Back</p></Link>
            </div>
        }
        {
            singleevent!==null&& requests?.map((el)=>(
                <Requests key={el._id} playerdetails={singleevent.playerdetails} request_id={el._id}  event_id={el.event_id} creator_id={el.creator_id} player_id={el.player_id} player={el.player} count={singleevent.count} total_players={singleevent.players} />
            ))
        }
    </div>
  )
}

export default Singleevent