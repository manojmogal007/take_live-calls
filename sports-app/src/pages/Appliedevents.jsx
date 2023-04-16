import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../components/url'
import '../styles/Appliedevents.css'

const Appliedevents = () => {
    const [allreq,setallreq]=useState(null)
    // console.log(allreq)
    const user=JSON.parse(localStorage.getItem('user'))

    const fetchappliedevent=()=>{
        axios({
            url:`${url}/request/getbyplayer`,
            method:'post',
            data:{
                player_id:user._id
            }
        })
        .then((res)=>{
            // console.log(res.data.requests)
            setallreq(res.data.requests)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchappliedevent()
    },[])

  return (
    <div className='allappliedevents'>
        <h1>All applied events</h1>
        {
            allreq!==null&&allreq.length===0&&<h2>You are not applied to any event yet</h2>
        }
        <div>
            {
                allreq?.map((el)=>(
                    <div key={el._id}>
                        <p>Title : {el.event.title}</p>
                        <p>{el.event.game}</p>
                        <p>Date : {el.event.date}</p>
                        <p>Time : {el.event.starttime} to {el.event.endtime}</p>
                        <p>Status : {el.status}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Appliedevents